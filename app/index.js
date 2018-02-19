require('styles/main.scss');

import vendor from 'vendor/vendor';
import React from 'react';
import { render } from 'react-dom';
import App from 'components';

const mountNode = document.getElementById('root');
render(
    <App />,
    mountNode
);