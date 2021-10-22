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
import CheckBoxInfo from "../model/CheckBoxInfo";


interface ProjectsParams {//TODO: remove
    workspaceId: string,
    workspaceTitle: string
}

interface ProjectProps {
    user?: boolean
}

export default function Projects() {
    const {workspaceId, workspaceTitle} = useParams<ProjectsParams>();
    const {totalCount, pageSize, pageNumber} = useSelector(getPaging, shallowEqual);
    const [activeOnly, setActiveOnly] = useState(false);

    const [data, setData] = useState([] as Project[]);
    console.log("render Projects")

    const dispatch = useDispatch();

    useEffect(() => {
        getProjectsForWorkspace(new ProjectQuery([], new Pageable(pageNumber, pageSize), workspaceId, activeOnly))
            .then(r => {
                setData(r.projects)
                dispatch(initPaging(r.totalCount, pageSize, pageNumber))
            });
    }, [workspaceId, pageNumber, pageSize]);//TODO: call back here

    // function a(b: boolean) {
    //     console.log(b);
    // }

    return (<BadgePage checkBoxes={[new CheckBoxInfo('Показать только активные', setActiveOnly)]}
                       title={`Проекты из "${workspaceTitle}"`} badgeData={data} squared={false}
                       href={i => `/project?projectId=${i.id}&workspaceId=${workspaceId}`}
                       addTitle='Добавить проект' addOnClick={() => window.location.href=`/project?isNew&workspaceId=${workspaceId}`}/>);
}
