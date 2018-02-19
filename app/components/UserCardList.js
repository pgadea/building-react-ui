import React, { Component } from 'react';
import UserCard from 'components/UserCard';

export default class UserCardList extends Component {

    onRemoveUser(user) {
        this.props.handleRemoveUser(user);
    }
    
    render() {
          const cards = this.props.users.map((user, index) => {
            return <UserCard 
            key={index} 
            user={user} 
            onRemoveUser = { this.onRemoveUser.bind(this) }
            currentUser = { user }
            />;
          });
          return (
              <div>
                  { cards }
              </div>
          )
    }
}