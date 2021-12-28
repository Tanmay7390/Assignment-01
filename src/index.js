import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './routes';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(<BrowserRouter><Pages/></BrowserRouter>, document.getElementById('root'));
