import React, {useEffect, useState} from 'react';
import {Container, makeStyles, Paper, Typography} from "@material-ui/core";
import Centered from "../components/util/Centered";
import DefaultBadge from "../components/elements/DefaultBadge";
import ProjectMenu from "../components/elements/ProjectMenu";
import QueryPanel from "../components/elements/QueryPanel";
import {useParams} from "react-router-dom";
import PagingPanel from "../components/elements/PagingPanel";
import BadgePage from "../components/elements/BadgePage";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {initPaging} from "../store/actions/paging/setPagingData";
import {getProjectsForWorkspace} from "../api/projects";
import ProjectQuery from "../model/dto/ProjectQuery";
import Pageable from "../model/Pageable";
import Project from "../model/Project";
import getPaging from "../hooks/getPaging";
import AddProject from "../components/elements/AddProject";


const useStyles = makeStyles(theme => ({
    main: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "start",
    },
    query: {
        // margin: '2% 0 0 0'
        padding: '10px'
    },
    title: {
        margin: '45px 0 10px 0'
    }
}));

interface ProjectsParams {
    workspaceId: string,
    workspaceTitle: string
}

export default function Projects() {
    const classes = useStyles();

    const {workspaceId, workspaceTitle} = useParams<ProjectsParams>();
    const {totalCount, pageSize, pageNumber} =  useSelector(getPaging, shallowEqual);
    const [data, setData] = useState([] as Project[]);
    console.log("render Projects")

    const dispatch = useDispatch();

    useEffect(() => {
        getProjectsForWorkspace(new ProjectQuery([], new Pageable(pageNumber, pageSize), workspaceId))
            .then(r => {
                setData(r.projects)
                dispatch(initPaging(pageSize, r.totalCount, pageNumber))
            });
    }, [workspaceId, pageNumber, pageSize]);//TODO: call back here
    return (
        <>
            <ProjectMenu/>
            <BadgePage title={`Проекты из ${workspaceTitle}`} badgeData={data} />
        </>);
}