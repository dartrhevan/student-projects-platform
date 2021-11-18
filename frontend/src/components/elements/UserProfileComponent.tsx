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
import {allNotEmpty, getOnFieldChange} from "../../utils/utils";
import Aligned from "../../components/util/Aligned";
import ErrorMessage from "../../components/elements/ErrorMessage";
import UserProfile from "../../model/UserProfile";
import setLoginAction from "../../store/actions/auth/setLoginAction";
import {useDispatch} from "react-redux";
import TagsPanel from "../../components/util/TagsPanel";
import clsx from 'clsx';
import Card from "@material-ui/core/Card";
import Autocomplete from "@mui/material/Autocomplete";
import Tag from "../../model/Tag";
import {addRoleToReference, getRolesReference} from "../../api/reference";
import RolesInput from "./RolesInput";

const useStyles = makeStyles(theme => ({
    def: {
        margin: "15px",
    },
    container: {
        maxWidth: '500px'
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
        padding: '15px'
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
    const [oldPassword, setOldPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [comment, setComment] = useState('');
    const [group, setGroup] = useState('');
    const passwordConfirmed = password === passwordConfirm;
    const [roles, setRoles] = useState([] as string[]);
    const [tags, setTags] = useState([] as Tag[]);

    useEffect(() => {
        if (user !== undefined) {
            setMessenger(user?.messenger);
            setUsername(user?.username);
            setSurname(user?.surname);
            setName(user?.name);
            setTags(user?.skills);
            setGroup(user?.group);
            setComment(user?.comment);
            setRoles(user?.roles);
            setEmail(user?.email);
        }
    }, [user]);
    const passwordLabels = getPasswordLabel(user);

    console.log('name');

    console.log(name);
    const dispatch = useDispatch();
    const onRegister = () => register(new UserProfile(name, surname, username, email, messenger, comment, group, roles, tags), password)
        .then(r => {//TODO: extract common part from login
            dispatch(setLoginAction(r));
            window.location.href = '/';
        }).catch(alert); //TODO: implement correct catch;

    const allFilledAndValid = allNotEmpty(username, password, passwordConfirm) && email.match(emailPattern) && username.length >= 6 && password.length >= 6;

    function onUpdate() {
        update(new UserProfile(name, surname, username, email, messenger, comment, group, roles, tags), password, oldPassword)
            .then(r => {//TODO: extract common part from login
                // dispatch(setLoginAction(r));
                alert('Success');
                window.location.href = '/';
            }).catch(alert); //TODO: implement correct catch;
    }


    return (
        <Centered additionalClasses={[classes.container]}>
            <Card className={clsx(classes.card, classes.skills)}>
                <Typography variant="h5">
                    {title}
                </Typography>
                <CssBaseline/>

                <TextField label="Имя" value={name} className={classes.def} onChange={getOnFieldChange(setName)}
                           fullWidth={true} required/>
                <TextField label="Фамилия" value={surname} className={classes.def} required
                           onChange={getOnFieldChange(setSurname)} fullWidth={true}/>
                <TextField label="Логин" value={username} className={classes.def} required
                           onChange={getOnFieldChange(setUsername)} fullWidth={true}/>
                <TextField label="Email" value={email} className={classes.def}
                           onChange={getOnFieldChange(setEmail)} fullWidth={true}/>
                <TextField label="Мэсэнджер" value={messenger} className={classes.def}
                           onChange={getOnFieldChange(setMessenger)} fullWidth={true}/>
                <TextField label="Группа" value={group} className={classes.def}
                           onChange={getOnFieldChange(setGroup)} fullWidth={true}/>
                <TextField label='Кратко опишите ваши интерересы' multiline={true} focused className={classes.def}
                           onChange={getOnFieldChange(setComment)} fullWidth={true} value={comment}/>
                <CssBaseline/>
                <div className={clsx(classes.def, classes.skills)}>
                    <Typography className={classes.def} align='center'>Введи ваши навыки</Typography>
                    <TagsPanel label='skill' tagInputClasses={[classes.tagInput]} onSetTag={setTags}/>
                </div>
                <RolesInput onChange={s => setRoles(s as string[])} defRoles={roles} />
                {user ?
                    <TextField label="Текущий пароль" className={classes.def}
                               onChange={getOnFieldChange(setOldPassword)}
                               type="password" fullWidth={true} required/> : <></>}
                <TextField label={passwordLabels.input} className={classes.def} onChange={getOnFieldChange(setPassword)}
                           type="password" fullWidth={true} required/>
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

                <Aligned endAlign={true}>
                    <Button disabled={!(passwordConfirmed && allFilledAndValid)}
                            className={classes.def} onClick={user ? onUpdate : onRegister}>
                        Подтвердить
                    </Button>
                </Aligned>
            </Card>
        </Centered>);
}
