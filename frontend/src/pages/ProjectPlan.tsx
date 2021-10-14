import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Project, {DetailedProject} from "../model/Project";
import {Typography} from "@material-ui/core";


interface ProjectParams {
    workspaceId: string,
    projectId: string
}

export default function ProjectPlan() {

    const {workspaceId, projectId} = useParams<ProjectParams>();
    const [project, setProject] = useState(null as DetailedProject | null);

    const dispatch = useDispatch();

    return (<>
        {/*<ProjectMenu/>*/}
        <Typography>План проекта</Typography>
    </>);
}
