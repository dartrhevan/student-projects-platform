import React from 'react';
import './App.css';
import Header from "./components/elements/Header";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Start from "./pages/Start";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Centered from "./components/util/Centered";
import MainMenu from './components/elements/MainMenu';
import Projects from "./pages/Projects";
import {getUsername} from "./api/auth";
import {useDispatch} from "react-redux";
import setLoginAction from "./store/actions/auth/setLoginAction";
import {makeStyles} from "@material-ui/core";

// const useStyles = makeStyles(theme => ({
//     main: {
//         width: '100%'
//     }
// }));

function App() {
    // const dispatch = useDispatch();
    console.log("render Start")
    // const classes = useStyles();
    const dispatch = useDispatch();
    getUsername().then(r => dispatch(setLoginAction(r))).catch(console.log); // TODO: may be move somewhere
    return (
        <>
            <Header/>
            <MainMenu/>
            <Centered>
                <BrowserRouter>
                    <Switch>
                        <Route component={Login} path='/authentication'/>
                        <Route component={Register} path='/registration'/>
                        <Route component={Projects} path='/projects'/>
                        <Route component={Start} path='/'/>
                    </Switch>
                </BrowserRouter>
            </Centered>
        </>
    );
}

export default App;
