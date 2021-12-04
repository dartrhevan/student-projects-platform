import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/elements/Header";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Centered from "./components/util/Centered";
import MainMenu from './components/elements/MainMenu';
import Projects from "./pages/Projects";
import {useDispatch, useSelector} from "react-redux";
import Users from "./pages/Users";
import Notifications from "./pages/Notifications";
import Workspaces from './pages/Workspaces';
import ProjectDetailedPage from "./pages/ProjectDetailedPage";
import UserProfilePage from "./pages/UserProfilePage";
import Portfolio from "./pages/Portfolio";
import ProjectPlanComponent from "./pages/ProjectPlanComponent";
import Scores from "./pages/Scores";
import {getCurrentUser} from "./api/auth";
import logoutAction from "./store/actions/auth/logoutAction";
import Scoring from "./pages/Scoring";
import {Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";
import {hide} from "./store/actions/log/log";
import {getLogState, useError, useInfo, useSuccess} from "./hooks/logging";
import StartPage from "./pages/StartPage";
import Tag from "./model/Tag";
import {setTagsRef} from "./store/actions/tags/tags";
import {getTagsReference} from "./api/reference";
import {makeStyles} from "@material-ui/core";
import THEME, {BackgroundStyle} from './theme';


const useStyles = makeStyles(theme => ({
    main: {
        width: '100vw',
        paddingTop: '60px',
        maxWidth: '100vw',
        ...BackgroundStyle
    }
}));

function App() {
    console.log("render Start")
    const classes = useStyles();
    const dispatch = useDispatch();

    const error = useError();


    function setTagsReference(r: Tag[]) {
        dispatch(setTagsRef(r));
    }

    useEffect(() => {
        // setTags(values);
        getTagsReference()
            .then(r => {
                setTagsReference(r);
            }).catch(console.log);
    }, [dispatch]);

    useEffect(() => {
        getCurrentUser()?.then(r => {
            console.log(r);
        }).catch(r => {
            console.log(r);
            error('Auth not valid');
            dispatch(logoutAction());
            window.location.href = '/';
        }); // TODO: may be move somewhere
    }, [error, dispatch]);

    const log = useSelector(getLogState);

    function handleClose() {
        dispatch(hide());
    }

    return (
        <>
            <Header/>
            <MainMenu/>
            <Snackbar open={log.text !== undefined} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={log.level} sx={{width: '100%'}}>
                    {log.text}
                </Alert>
            </Snackbar>
            <Centered additionalClasses={[classes.main]}>
                <BrowserRouter>
                    <Switch>
                        <Route component={Login} path='/authentication'/>
                        <Route component={Register} path='/registration'/>
                        <Route component={Projects} path='/projects/:workspaceId/:workspaceTitle'/>
                        <Route component={Projects} path='/projects'/>
                        <Route component={Users} path='/users'/>
                        <Route component={Notifications} path='/notifications'/>
                        <Route component={ProjectDetailedPage} path='/project'/>
                        <Route component={ProjectPlanComponent} path='/project-plan'/>
                        <Route component={UserProfilePage} path='/profile'/>
                        <Route component={Scores} path='/scores/:workspaceId'/>
                        <Route component={Portfolio} path='/portfolio/:login'/>
                        <Route component={Scoring} path='/scoring/:workspaceId'/>
                        <Route component={Workspaces} path='/workspaces'/>
                        <Route component={StartPage} path='/'/>
                    </Switch>
                </BrowserRouter>
            </Centered>
        </>
    );
}

export default App;
