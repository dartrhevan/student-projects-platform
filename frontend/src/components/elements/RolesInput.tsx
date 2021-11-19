import React, {useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import {addRoleToReference, getRolesReference} from "../../api/reference";

interface RolesProps {
    defRoles?: string[],
    onChange: (r: string[] | string) => void
    multiple?: boolean
    role?: string
}

export default function ({defRoles = [], onChange, multiple = true}: RolesProps) {
    const [roles, setRoles] = useState(defRoles);
    // const [role, setRole] = useState('');
    const [rolesReference, setRolesReference] = useState([] as string[]);

    useEffect(() => {
        getRolesReference().then(r => setRolesReference(r.data)).catch(console.log);
    }, [onChange, multiple]);

    const onChangeRoles = (a: any, b: string[]) => {
        // let newRole: string;
        // if (multiple) {
        const newRoles = b as string[];
        onChange(newRoles);
        setRoles(newRoles);
        // console.log(b)
        const newRole = newRoles[newRoles.length - 1];
        // } else {
        //     newRole = b as string;
        //     onChange([newRole]);
        //     setRole(newRole);
        // }
        if (!rolesReference.includes(newRole)) {
            addRoleToReference(newRole).then(r => setRolesReference([...rolesReference, newRole])).catch(console.log);
        }
    };

    function onChangeRole(a: any, b: string | null) {
        const newRole = b ? b : '';
        onChange(newRole);
        // setRole(newRole);
    }

    return multiple ? (<Autocomplete multiple={multiple} freeSolo onChange={onChangeRoles}
                                     options={rolesReference} value={roles}
                                     fullWidth={true} renderInput={(params) =>
            (<TextField {...params} variant="standard" label="Ваша роль"
                        placeholder="Введите роль, которую вы готовы выполнять"/>)}/>)
        : (<Autocomplete freeSolo onChange={onChangeRole}
                         options={rolesReference}
                         fullWidth={true} renderInput={(params) =>
            (<TextField {...params} variant="standard" label="Ваша роль"
                        placeholder="Введите роль, которую вы готовы выполнять"/>)}/>);
}
