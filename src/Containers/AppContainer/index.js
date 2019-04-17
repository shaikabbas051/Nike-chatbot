import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ChatContainer from '../ChatContainer';
import HomeContainer from '../ListContainer';

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/chat' component={ChatContainer} />
                    <Route path='/' component={HomeContainer} />
                </Switch>
            </BrowserRouter>
        </div>
    )
};