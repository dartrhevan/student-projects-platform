import React from 'react';
import './App.css';
import Header from "./components/elements/Header";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Centered from "./components/util/Centered";
import MainMenu from './components/elements/MainMenu';
import Projects from "./pages/Projects";
import {useDispatch} from "react-redux";
import Users from "./pages/Users";
import Notifications from "./pages/Notifications";
import Workspaces from './pages/Workspaces';
import ProjectDetailedPage from "./pages/ProjectDetailedPage";
import UserProfilePage from "./pages/UserProfilePage";
import Portfolio from "./pages/Portfolio";
import ProjectPlanComponent from "./pages/ProjectPlanComponent";

function App() {
    // const dispatch = useDispatch();
    console.log("render Start")
    // const classes = useStyles();
    const dispatch = useDispatch();
    // getCurrentUser().then(r => dispatch(setLoginAction(r))).catch(console.log); // TODO: may be move somewhere
    return (
        <>
            <Header/>
            <MainMenu/>
            <Centered>
                <BrowserRouter>
                    <Switch>
                        <Route component={Login} path='/authentication'/>
                        <Route component={Register} path='/registration'/>
                        <Route component={Projects} path='/projects/:workspaceId/:workspaceTitle'/>
                        <Route component={Users} path='/users'/>
                        <Route component={Notifications} path='/notifications'/>
                        <Route component={ProjectDetailedPage} path='/project'/>
                        <Route component={ProjectPlanComponent} path='/project_plan'/>
                        <Route component={UserProfilePage} path='/profile'/>
                        <Route component={Portfolio} path='/portfolio/:login'/>
                        <Route component={Workspaces} path='/'/>
                    </Switch>
                </BrowserRouter>
            </Centered>
        </>
    );
}

export default App;
