import React, {useEffect, useState} from 'react';
import {
    Button,
    CssBaseline,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {register, update} from "../../api/auth";
import Centered from "../../components/util/Centered";
import {allNotEmpty, getOnFieldChange, isValid} from "../../utils/utils";
import Aligned from "../../components/util/Aligned";
import ErrorMessage from "../../components/elements/ErrorMessage";
import UserProfile from "../../model/UserProfile";
import setLoginAction from "../../store/actions/auth/setLoginAction";
import {useDispatch} from "react-redux";
import TagsPanel from "../../components/util/TagsPanel";
import clsx from 'clsx';
import Card from "@material-ui/core/Card";
import Tag from "../../model/Tag";
import RoleInput, {RolesInput} from "./RoleInput";
import {useError, useSuccess} from "../../hooks/logging";
import GenericResponse from "../../model/dto/GenericResponse";
import {Login} from "../../store/state/LoginState";
import THEME, {ElementsStyle} from "../../theme";
import Fade from '@mui/material/Fade';

const useStyles = makeStyles(theme => ({
    def: {
        margin: "15px",
    },
    container: {
        maxWidth: '500px',
    },
    skills: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    tagInput: {
        width: '80%',
    },
    card: {
        margin: '40px 0',
        padding: '15px',
        ...ElementsStyle
    }
}));

interface UserProfileProps {
    user?: UserProfile
    title: string
}

function getPasswordLabel(user: any | undefined) {
    return user ? {
        input: 'Новый пароль',
        confirmation: 'Подтверждение нового пароля'
    } : {
        input: 'Пароль',
        confirmation: 'Подтверждение пароля'
    };
}

const emailPattern = /\w+@\w+/;

export default function UserProfileComponent({user, title}: UserProfileProps) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [messenger, setMessenger] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [comment, setComment] = useState('');
    const [group, setGroup] = useState('');
    const passwordConfirmed = user === undefined ? password === passwordConfirm : newPassword === passwordConfirm;
    const [roles, setRoles] = useState([] as string[]);
    const [tags, setTags] = useState([] as Tag[]);

    useEffect(() => {
        if (user !== undefined) {
            setMessenger(user?.messenger);
            setUsername(user?.username);
            setSurname(user?.surname);
            setName(user?.name);
            setTags(user?.skills.map(t => new Tag(t.id, t.name, t.color)));
            setGroup(user?.group);
            setComment(user?.comment);
            setRoles(user?.roles);
            setEmail(user?.email);
        }
    }, [user]);
    const passwordLabels = getPasswordLabel(user);

    const error = useError();
    const success = useSuccess();

    const dispatch = useDispatch();
    const onRegister = () => register(new UserProfile(name, surname, username, email, messenger, comment, group, roles, tags), password)
        .then((r: GenericResponse<Login>) => {
            success('Вы успешно зарегистрированы');
            dispatch(setLoginAction(r.data));
            setInterval(() => window.location.href = '/profile', 500);
        }).catch(error);

    const required = [];

    if (user === undefined) {
        required.push();
    }

    const isValidLogin = isValid(username);
    const registerFilled = allNotEmpty(username, name, surname, password, passwordConfirm);
    const editFilled = allNotEmpty(username, name, surname, password);

    const allFilledAndValid = (user === undefined ? registerFilled : editFilled)
        && email.match(emailPattern) !== null && username.length >= 6 && password.length >= 6;

    function onUpdate() {
        update(new UserProfile(name, surname, username, email, messenger, comment, group, roles, tags), password, newPassword)
            .then(r => {
                success("Настройки профиля были изменены");
            }).catch(error);
    }

    const allFilled = allNotEmpty(messenger, username, surname, name, tags, group, comment, roles, email);

    return (
        <Centered additionalClasses={[classes.container]} autoComplete="off">
            <Fade in={true}>
                <Card className={clsx(classes.card, classes.skills)} >
                    <Typography variant="h5">
                        {title}
                    </Typography>
                    {user !== undefined && !allFilled ?
                        <Typography color='textSecondary' variant='body2'>
                            В вашем профиле остались незаполненные поля.
                        </Typography> : ''}
                    <CssBaseline/>

                    <TextField label="Имя" value={name} className={classes.def} onChange={getOnFieldChange(setName)}
                               fullWidth={true} required/>
                    <TextField label="Фамилия" value={surname} className={classes.def} required
                               onChange={getOnFieldChange(setSurname)} fullWidth={true}/>
                    <TextField label="Логин" value={username} className={classes.def} required disabled={user !== undefined}
                               onChange={getOnFieldChange(setUsername)} fullWidth={true}/>
                    <TextField label="Email" value={email} className={classes.def} required
                               onChange={getOnFieldChange(setEmail)} fullWidth={true}/>
                    <TextField label="Группа" value={group} className={classes.def}
                               onChange={getOnFieldChange(setGroup)} fullWidth={true}/>
                    <CssBaseline/>
                    {user !== undefined ? (<>
                        <TextField label="Мэсэнджер" value={messenger} className={classes.def}
                                   onChange={getOnFieldChange(setMessenger)} fullWidth={true}/>
                        <TextField label='Кратко опишите ваши интерересы' multiline={true}
                                   focused className={classes.def} onChange={getOnFieldChange(setComment)}
                                   fullWidth={true} value={comment}/>
                        <div className={clsx(classes.def, classes.skills)}>
                            <Typography className={classes.def} align='center'>Введи ваши навыки</Typography>
                            <TagsPanel values={tags} label='skill' tagInputClasses={[classes.tagInput]}
                                       onSetTag={setTags}/>
                        </div>
                        <RolesInput onChange={s => setRoles(s as string[])} defRoles={roles}/>
                    </>) : <></>}
                    {user ?
                        <TextField label="Текущий пароль" className={classes.def}
                                   onChange={getOnFieldChange(setPassword)}
                                   type="password" fullWidth={true} required/> : <></>}
                    <TextField label={passwordLabels.input} className={classes.def}
                               onChange={getOnFieldChange(user === undefined ? setPassword : setNewPassword)}
                               type="password" fullWidth={true} required autoComplete="new-password"/>
                    <TextField label={passwordLabels.confirmation} className={classes.def} type="password"
                               onChange={getOnFieldChange(setPasswordConfirm)} fullWidth={true} required/>

                    <CssBaseline/>
                    <ErrorMessage message='*Пароль и подтверждение не совпадают' condition={!passwordConfirmed}/>
                    <ErrorMessage message='*Не все обязательные поля заполнены корректно'
                                  condition={!(passwordConfirmed && allFilledAndValid)}/>
                    <ErrorMessage message='*Логин и пароль должны содержать не меньше 6 символов'
                                  condition={!(username.length >= 6 && password.length >= 6)}/>
                    <ErrorMessage message='*Некорректный емайл'
                                  condition={!(email?.match(emailPattern))}/>
                    <ErrorMessage message="*Логин может содержать только цифры, буквы, пробел и '-'" condition={!isValidLogin}/>

                    <Aligned endAlign={true}>
                        <Button disabled={!(passwordConfirmed && allFilledAndValid)}
                                className={classes.def} onClick={user ? onUpdate : onRegister}>
                            {user ? "Подтвердить изменения" : "Зарегистрироваться"}
                        </Button>
                    </Aligned>
                </Card>
            </Fade>
        </Centered>);
}
