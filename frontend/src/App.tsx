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


function App() {
    // const dispatch = useDispatch();
    console.log("render Start")
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
