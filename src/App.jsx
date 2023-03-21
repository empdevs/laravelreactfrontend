import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from './components/Home';
import CreateContacts from './components/CreateContacts';
function App() {
    return (
        <Router>
            <Route exact path='/' component={Home} />
            <Route path='/CreateContacts' component={CreateContacts} />
            <Route path='/EditContacts/:id' component={CreateContacts} />
        </Router>
    )
}

export default App