import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import BadgePage from "../components/elements/BadgePage";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {initPaging} from "../store/actions/paging/setPagingData";
import {getProjectsForWorkspace} from "../api/projects";
import ProjectQuery from "../model/dto/ProjectQuery";
import Pageable from "../model/Pageable";
import Project from "../model/Project";
import getPaging from "../hooks/getPaging";


interface ProjectsParams {
    workspaceId: string,
    workspaceTitle: string
}

export default function Projects() {
    const {workspaceId, workspaceTitle} = useParams<ProjectsParams>();
    const {totalCount, pageSize, pageNumber} =  useSelector(getPaging, shallowEqual);
    const [data, setData] = useState([] as Project[]);
    console.log("render Projects")

    const dispatch = useDispatch();

    useEffect(() => {
        getProjectsForWorkspace(new ProjectQuery([], new Pageable(pageNumber, pageSize), workspaceId))
            .then(r => {
                setData(r.projects)
                dispatch(initPaging(r.totalCount, pageSize, pageNumber))
            });
    }, [workspaceId, pageNumber, pageSize]);//TODO: call back here

    return (<BadgePage title={`Проекты из ${workspaceTitle}`} badgeData={data}
                       href={i => `/project?projectId=${i}&workspaceId=${workspaceId}`}/>);
}
