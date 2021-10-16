import React, {useEffect, useState} from 'react';
import {
    Button,
    CssBaseline,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {register} from "../../api/auth";
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

export default function UserProfileComponent({user, title}: UserProfileProps) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        if (user !== undefined) {
            setUsername(user?.username)
            setSurname(user?.surname)
            setName(user?.name)
        }
    }, [user]);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const passwordConfirmed = password === passwordConfirm;
    const rolesReference = ['front', 'back', 'devops', 'test', 'analytic']; //TODO: get from backend
    const [roles, setRoles] = useState([] as string[]);

    const passwordLabels = getPasswordLabel(user);

    console.log('name');

    console.log(name);
    const dispatch = useDispatch();
    const onRegister = () => register(new UserProfile(name as string, surname as string,
        username as string, roles, []), password as string)
        .then(r => {//TODO: extract common part from login
            dispatch(setLoginAction(r));
            window.location.href = '/';
        }).catch(alert); //TODO: implement correct catch;

    const allFilled = allNotEmpty(username, password, passwordConfirm);

    function onUpdate() {

    }

    return (
        <Centered additionalClasses={[classes.container]}>
            <Card className={clsx(classes.card, classes.skills)}>
                <Typography variant="h5">
                    {title}
                </Typography>
                <CssBaseline/>

                <TextField label="Имя" value={name} className={classes.def} onChange={getOnFieldChange(setName)}
                           fullWidth={true}/>
                <TextField label="Фамилия" value={surname} className={classes.def}
                           onChange={getOnFieldChange(setSurname)}
                           fullWidth={true}/>
                <TextField label="Логин" value={username} className={classes.def}
                           onChange={getOnFieldChange(setUsername)}
                           fullWidth={true}/>
                <CssBaseline/>
                <div className={clsx(classes.def, classes.skills)}>
                    <Typography className={classes.def} align='center'>Введи ваши навыки</Typography>
                    <TagsPanel label='skill' tagInputClasses={[classes.tagInput]} onSetTag={console.log}/>
                </div>
                <Autocomplete
                    multiple
                    freeSolo
                    onChange={(a, b: string[]) => setRoles(b)}
                    id="tags-standard"
                    options={rolesReference}
                    // getOptionLabel={(option) => option.title}
                    defaultValue={user?.roles}
                    fullWidth={true}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Ваша роль"
                            placeholder="Введите роль, которую вы готовы выполнять"/>)}
                />
                {user ? <TextField label="Текущий пароль" className={classes.def} onChange={getOnFieldChange(setPassword)}
                           type="password" fullWidth={true}/> : <></>}
                <TextField label={passwordLabels.input} className={classes.def} onChange={getOnFieldChange(setPassword)}
                           type="password" fullWidth={true}/>
                <TextField label={passwordLabels.confirmation} className={classes.def} type="password"
                           onChange={getOnFieldChange(setPasswordConfirm)} fullWidth={true}/>

                <CssBaseline/>
                <ErrorMessage message='*Пароль и подтверждение не совпадают' condition={!passwordConfirmed}/>
                <ErrorMessage message='*Не все обязательные поля заполнены' condition={!(passwordConfirmed && allFilled)}/>

                <Aligned endAlign={true}>
                    <Button disabled={!(passwordConfirmed && allFilled)} className={classes.def}
                            onClick={user ? onUpdate : onRegister}>Подтвердить</Button>
                </Aligned>
            </Card>
        </Centered>);
}
