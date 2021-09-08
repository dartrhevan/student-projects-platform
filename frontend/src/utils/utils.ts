import {ChangeEvent} from "react";

export function getOnFieldChange(setter: (v: string) => void) {
    return (e: ChangeEvent<HTMLInputElement>) => setter((e.currentTarget as HTMLInputElement).value);
}

export function allNotEmpty(...values: string[]) {
    return values.every(e => e && e !== '');
}