import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import BadgePage from "../components/elements/BadgePage";
import CheckBoxInfo from "../model/CheckBoxInfo";
import {openDialog} from "../store/actions/dialog/dialog";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getProjectsForWorkspace} from "../api/projects";
import ProjectQuery from "../model/dto/ProjectQuery";
import Pageable from "../model/Pageable";
import {initPaging} from "../store/actions/paging/setPagingData";
import {useParams} from "react-router-dom";
import getPaging from "../hooks/getPaging";
import Project from "../model/Project";
import Workspace from "../model/Workspace";
import {getUsersWorkspaces} from "../api/workspaces";


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

interface WorkspacesParams {
    workspaceId: string,
    workspaceTitle: string
}

export default function Workspaces() {
    const classes = useStyles();
    const {workspaceId, workspaceTitle} = useParams<WorkspacesParams>();
    const {totalCount, pageSize, pageNumber} = useSelector(getPaging, shallowEqual);

    const [data, setData] = useState([] as Workspace[]);
    console.log("render Projects")

    const dispatch = useDispatch();

    useEffect(() => {
        getUsersWorkspaces(new Pageable(pageNumber, pageSize)).then(r => {
            setData(r.payload.w)
            dispatch(initPaging(r.payload.p.totalCount, r.payload.p.pageSize, r.payload.p.pageNumber))//TODO: call back here
        })
    }, [workspaceId, workspaceTitle]);

    return (<BadgePage
        showDialog={true}
        addTitle='Создать рабочее пространство'
        addOnClick={() => dispatch(openDialog())}
        title='Просмотр рабочих пространств'
        badgeData={data}
        href={s => `/projects/${(s as Workspace).id}/${(s as Workspace).title}`}/>);
}
