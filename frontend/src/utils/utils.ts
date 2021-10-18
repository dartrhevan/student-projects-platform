import {ChangeEvent} from "react";

export function getOnFieldChange(setter: (v: string) => void) {
    return (e: ChangeEvent<HTMLInputElement>) => setter((e.currentTarget as HTMLInputElement).value);
}

export function allNotEmpty(...values: (string | null | undefined)[]) {
    return values.every(e => e && e !== '');
}

export function randomInt(min: number = 0, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// export function randomInt(max: number) {
//     return randomInt(0, max);
// }
