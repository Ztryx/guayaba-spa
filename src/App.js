import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import AddressBook from "./AddressBook/AddressBook";
import brown from '@material-ui/core/colors/brown';
import black from '@material-ui/core/colors/grey';
import logo from "./static/logo.png";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: black["900"] },
        secondary: { main: brown["700"] },
    },
    typography: {
        useNextVariants: true,
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <HashRouter>
                    <div>
                        <div className="top-static-ui">
                            <img className="img-logo" src={logo} alt="Guayaba SPA"/>
                            <ul className="header">
                                <li><NavLink to="/">ADDRESS BOOK</NavLink></li>
                            </ul>
                        </div>
                        <div className="content">
                            <Route path="/" component={AddressBook}/>
                        </div>
                    </div>
                </HashRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;
