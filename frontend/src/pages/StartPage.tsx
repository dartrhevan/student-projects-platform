import React from 'react';
import {Paper, Typography} from "@mui/material";
import Centered from "../components/util/Centered";

export default function StartPage() {
    return (
        <Paper sx={{padding: '25px', width: '100%', height: '70%'}}>
            <Typography align='center' variant='h4' paragraph>
                Платформа для организации проектной деятельности
            </Typography>
            <Centered>
                <Typography fontSize='1.25rem'>
                    Данная платформа призвана облегчеть организацию "Проектного практикума".
                    <br/>
                    <br/>
                    Основные возможности включают:
                    <ul>
                        <li>Создание своего проекта</li>
                        <li>Формирование команды для работы над проектом</li>
                        <li>Присоединение к существующему проекту</li>
                        <li>Отслеживание прогресса работы над проектом</li>
                        <li>Взаимодействие с организаторами</li>
                        <li>И многое другое...</li>
                    </ul>
                </Typography>
            </Centered>
        </Paper>);
}
