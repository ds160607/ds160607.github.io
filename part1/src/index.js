require("./style/main.sass");
require("reset-css/reset.css");
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));
