import React from 'react';
import {Button, Divider, Fade, Paper, Typography} from "@mui/material";
import Centered from "../components/util/Centered";
import {ElementsStyle} from "../theme";
import DescriptionElement from "../components/elements/DescriptionElement";
import AssignmentIcon from '@mui/icons-material/AssignmentTwoTone';
import GroupsIcon from '@mui/icons-material/GroupsTwoTone';
import GroupAddIcon from '@mui/icons-material/GroupAddTwoTone';
import StairsIcon from '@mui/icons-material/StairsTwoTone';
import SocialDistanceIcon from '@mui/icons-material/SocialDistanceTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ActiveDescriptionElement from '../components/elements/ActiveDescriptionElement';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import {useSelector} from "react-redux";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import EmailIcon from '@mui/icons-material/Email';
import getUsername from "../hooks/getUsername";
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';

export default function StartPage() {
    const login = useSelector(getUsername);
    return (
        <Fade in={true}>
            <Paper sx={{
                padding: '15px 5px', width: '70%', marginTop: '50px', marginBottom: '20px', ...ElementsStyle
            }}>
                <Typography align='center' variant='h4' paragraph>
                    Платформа для организации проектной деятельности
                </Typography>
                {login ?
                    (<>
                            <Typography variant='h6' paragraph style={{marginLeft: '60px'}}>Вы можете
                                просмотреть:</Typography>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}>
                                <ActiveDescriptionElement href='/workspaces' small
                                                          icon={<AutoAwesomeMosaicIcon color='primary'/>}>
                                    Доступные рабочие пространства
                                </ActiveDescriptionElement>
                                <ActiveDescriptionElement href='/projects' small icon={<AppsIcon color='primary'/>}>
                                    Ваши проекты
                                </ActiveDescriptionElement>
                                <ActiveDescriptionElement href='/portfolio' small
                                                          icon={<FormatAlignJustifyIcon color='primary'/>}>
                                    Ваше портфолио
                                </ActiveDescriptionElement>
                                <ActiveDescriptionElement href='/profile' small icon={<PersonIcon color='primary'/>}>
                                    Ваш профиль
                                </ActiveDescriptionElement>
                                <ActiveDescriptionElement href='/notifications' small
                                                          icon={<EmailIcon color='primary'/>}>
                                    Уведомления
                                </ActiveDescriptionElement>
                            </div>
                        </>
                    ) : <></>}
                <Centered>
                    <Typography align='center' variant='h5'>
                        Данная платформа призвана облегчеть организацию "Проектного практикума".
                        <br/>
                        Основные возможности включают:
                    </Typography>
                    <DescriptionElement icon={<AutoAwesomeMotionIcon color='primary' fontSize='large'/>}>
                        Организация рабочего пространства для проектов
                    </DescriptionElement>
                    <Divider flexItem/>
                    <DescriptionElement icon={<AssignmentIcon color='primary' fontSize='large'/>}>
                        Создание своего проекта
                    </DescriptionElement>
                    <Divider flexItem/>
                    <DescriptionElement icon={<GroupsIcon color='primary' fontSize='large'/>}>
                        Формирование команды для работы над проектом
                    </DescriptionElement>
                    <Divider flexItem/>
                    <DescriptionElement icon={<GroupAddIcon color='primary' fontSize='large'/>}>
                        Присоединение к существующему проекту
                    </DescriptionElement>
                    <Divider flexItem/>
                    <DescriptionElement icon={<StairsIcon color='primary' fontSize='large'/>}>
                        Отслеживание прогресса работы над проектом
                    </DescriptionElement>
                    <Divider flexItem/>
                    <DescriptionElement icon={<SocialDistanceIcon color='primary' fontSize='large'/>}>
                        Взаимодействие с организаторами и менторами
                    </DescriptionElement>
                    <Divider flexItem/>
                    <DescriptionElement icon={<MoreHorizTwoToneIcon color='primary' fontSize='large'/>}>
                        И многое другое...
                    </DescriptionElement>
                    {!login &&
                    <ActiveDescriptionElement href='/authentication'
                                              icon={<PersonTwoToneIcon color='primary' fontSize='large'/>}>
                        Для начала работы необходимо <b>Авторизоваться</b>
                    </ActiveDescriptionElement>}
                </Centered>
            </Paper>
        </Fade>);
}
