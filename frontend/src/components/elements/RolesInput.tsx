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
    const [rolesReference, setRolesReference] = useState([] as string[]);

    useEffect(() => {
        setRoles(defRoles);
    }, [defRoles]);

    useEffect(() => {
        getRolesReference().then(r => setRolesReference(r.data)).catch(console.log);
    }, [onChange, multiple]);

    const onChangeRoles = (a: any, b: string[]) => {
        const newRoles = b as string[];
        onChange(newRoles);
        setRoles(newRoles);
        if (b.length === 0) return;
        const newRole = newRoles[newRoles.length - 1];
        if (!rolesReference.includes(newRole)) {
            addRoleToReference(newRole).then(r => setRolesReference([...rolesReference, newRole])).catch(console.log);
        }
    };

    function onChangeRole(a: any, b: string | null) {
        const newRole = b ? b : '';
        onChange(newRole);
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
