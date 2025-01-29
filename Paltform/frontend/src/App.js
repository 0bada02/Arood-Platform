import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Switch>
                    <Route exact path="/" component={Page1} />
                    <Route path="/page2" component={Page2} />
                    <Route path="/page3" component={Page3} />
                    <Route path="/page4" component={Page4} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
