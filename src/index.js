import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App.js';
import Quiz from './components/Quiz.js';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route path='/create-quiz' component={Quiz} />
            <Route path='/' component={App} />
        </Switch>
    </BrowserRouter>),
    document.getElementById('root')
);