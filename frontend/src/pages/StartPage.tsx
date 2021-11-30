import React from 'react';
import {Button, Paper, Typography} from "@mui/material";
import Centered from "../components/util/Centered";
import {ElementsStyle} from "../theme";
import DescriptionElement from "../components/elements/DescriptionElement";
import AssignmentIcon from '@mui/icons-material/AssignmentTwoTone';
import GroupsIcon from '@mui/icons-material/GroupsTwoTone';
import GroupAddIcon from '@mui/icons-material/GroupAddTwoTone';
import StairsIcon from '@mui/icons-material/StairsTwoTone';
import SocialDistanceIcon from '@mui/icons-material/SocialDistanceTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';

export default function StartPage() {
    return (
        <Paper sx={{
            padding: '15px 5px', width: '70%', marginTop: '50px', // height: '70%',
            ...ElementsStyle
        }}>
            <Typography align='center' variant='h4' paragraph>
                Платформа для организации проектной деятельности
            </Typography>
            <Centered>
                <Typography align='center' variant='h5'>
                    Данная платформа призвана облегчеть организацию "Проектного практикума".
                    <br/>
                    Основные возможности включают:
                </Typography>
                <DescriptionElement icon={<AssignmentIcon color='primary' fontSize='large'/>}>
                    Создание своего проекта
                </DescriptionElement>
                <DescriptionElement reversed icon={<GroupsIcon color='primary' fontSize='large'/>}>
                    Формирование команды для работы над проектом
                </DescriptionElement>
                <DescriptionElement icon={<GroupAddIcon color='primary' fontSize='large'/>}>
                    Присоединение к существующему проекту
                </DescriptionElement>
                <DescriptionElement reversed icon={<StairsIcon color='primary' fontSize='large'/>}>
                    Отслеживание прогресса работы над проектом
                </DescriptionElement>
                <DescriptionElement icon={<SocialDistanceIcon color='primary' fontSize='large'/>}>
                    Взаимодействие с организаторами
                </DescriptionElement>
                <DescriptionElement reversed icon={<MoreHorizTwoToneIcon color='primary' fontSize='large'/>}>
                    И многое другое...
                </DescriptionElement>
                <DescriptionElement href='/authentication' icon={<PersonTwoToneIcon color='primary' fontSize='large'/>}>
                    Для начала работы необходимо <b>Авторизоваться</b>
                </DescriptionElement>
            </Centered>
        </Paper>);
}
