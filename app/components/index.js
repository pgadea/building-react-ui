import React, { Component } from 'react';
import { getUsers } from 'api/RandomUsers';
import UserCardList from 'components/UserCardList';
import AddUserForm from 'components/AddUserForm';
import GenderSortDropdown from "components/GenderSortDropdown";
import SearchInput from 'components/SearchInput';
import { without, filter } from 'lodash';

export default class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: 'React Event',
            users: [],
            isFormVisible: false,
            selectedGender: '',
            selectedCountry: '',
            filterBy: 'all',
            query: ''
        };
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        getUsers(6, users => {
            this.setState({
                users
            });
        })
    }

    removeUser(user) {
        const users = without(this.state.users, user);
        this.setState({
            users
        });
    }

    toggleFormVisibility() {
        this.setState({
            isFormVisible: !this.state.isFormVisible
        });
    }

    changeSelectedGender(selectedGender) {
        this.setState({
            selectedGender
        });
    }

    changeSelectedCountry(selectedCountry) {
        this.setState({
            selectedCountry
        });
    }

    addUser(user) {
        const users =  this.state.users;
        users.push(user);
        this.setState({
            users
        });
    }

    changeGenderSortDropdownValue(filterBy) {
        this.setState({
            filterBy
        });
    }

    search(query) {
        this.setState({
            query
        });
    }

    searchByQuery(users, query) {
        const newUsers = [];
        users.forEach(user => {
            if(
                (user.name.toLowerCase().includes(query)) ||
                (user.region.toLowerCase().includes(query)) ||
                (user.email.toLowerCase().includes(query)) ||
                (user.gender.toLowerCase().includes(query)) ||
                (user.age == query)
            ) {
                newUsers.push(user);
            }
        });
        return newUsers;
    }

    render() {

        let currentUsers = this.state.users;

        const query = this.state.query.toLowerCase();

        currentUsers = this.searchByQuery(currentUsers, query);

        //male | female | all
        const filterBy = this.state.filterBy;

        if(filterBy !== 'all') {
            currentUsers = filter(currentUsers, user => user.gender === filterBy);
        }

        return <div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <AddUserForm handleToggleFormVisibility={this.toggleFormVisibility.bind(this)} isFormVisible={this.state.isFormVisible} selectedGender={this.state.selectedGender} handleSelectedGenderChange={this.changeSelectedGender.bind(this)} selectedCountry={this.state.selectedCountry} handleSelectedCountryChange={this.changeSelectedCountry.bind(this)} handleAddUser={this.addUser.bind(this)} />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <div className="form-inline">
                  <div className="mr-3">
                    <GenderSortDropdown 
                      handleGenderSortDropdownValueChange = { this.changeGenderSortDropdownValue.bind(this) }
                      filterBy = { this.state.filterBy } 
                    />
                  </div>                    
                  <SearchInput 
                    handleSearch = { this.search.bind(this) }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <h3 className="float-right">
                    <span className = "mr-3">
                      { currentUsers.length <= 0 ? <i className="em em-disappointed_relieved" /> : null }
                    </span>
                    { currentUsers.length } people attending to { this.state.eventName }
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card-columns">
                  <UserCardList users={ currentUsers } handleRemoveUser={ this.removeUser.bind(this) } />
                </div>
              </div>
            </div>
          </div>;
    }
}