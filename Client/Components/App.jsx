import React from "react"
import LogIn from "./LogIn"
import Home from "./Home"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom"

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {

        return (
            
            // configure route details in client
            <Router>

                    <Route path="/" exact strict render={() => {

                        return (<Redirect push to="/login" />);

                    }} />

                    <Route path="/home" exact strict render={(props) => {

                        return (<Home  {...props} />);

                    }} />


                    <Route path="/login" exact strict render={(props) => {

                        return (<LogIn {...props} />);

                    }} />

                </Router>

        );
    }

}

export default App;