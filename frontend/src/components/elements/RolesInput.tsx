import React, {useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import {addRoleToReference, getRolesReference} from "../../api/reference";

interface RolesProps {
    defRoles?: string[],
    onChange: (r: string[] | string) => void
    multiple?: boolean
    reference?: string[]
}

export default function RolesInput({defRoles = [], onChange, multiple = true, reference}: RolesProps) {
    const [roles, setRoles] = useState(defRoles);
    const [rolesReference, setRolesReference] = useState([] as string[]);

    useEffect(() => {
        setRoles(defRoles);
    }, []);

    useEffect(() => {
        if (reference)
            setRolesReference(reference as string[]);
    }, [reference]);


    useEffect(() => {
        if (!reference)
            getRolesReference().then(r => setRolesReference(r.data)).catch(console.log);
    }, []);

    const onChangeRoles = (a: any, b: string[]) => {
        const newRoles = b as string[];
        onChange(newRoles);
        setRoles(newRoles);
        if (b.length === 0) return;
        const newRole = newRoles[newRoles.length - 1];
        if (!rolesReference.includes(newRole)) {
            addRoleToReference(newRole)
                .then(r => setRolesReference([...rolesReference, newRole]))
                .catch(console.log);
        }
    };

    function onChangeRole(b: any) {
        const newRole = b.target.innerText ? b.target.innerText : b.target.value;// : '';
        onChange(newRole);
    }

    return multiple ? (<Autocomplete multiple={multiple} freeSolo onChange={onChangeRoles}
                                     options={rolesReference} value={roles}
                                     fullWidth={true} renderInput={(params) =>
            (<TextField {...params} variant="standard" label="Роль"
                        placeholder="Введите роль"/>)}/>)
        : (<Autocomplete onInput={onChangeRole} onChange={onChangeRole} onAbort={() => onChange('')} freeSolo options={rolesReference}
                         fullWidth={true} renderInput={(params) =>
            (<TextField {...params} variant="standard" label="Роль"
                        placeholder="Введите роль"/>)}/>);
}
