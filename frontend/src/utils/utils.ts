import {ChangeEvent} from "react";

export function getOnFieldChange(setter: (v: string) => void) {
    return (e: ChangeEvent<HTMLInputElement>) => setter((e.currentTarget as HTMLInputElement).value);
}

export function allNotEmpty(...values: any[]) {
    return values.every(e => e && e !== '');
}

export function randomInt(min: number = 0, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function toDateString(date: Date) {
    return date.toISOString().slice(0, 10);
}

export function getEnumKeys(myEnum: any) {
    return Object.keys(myEnum).map(key => myEnum[key]).filter(value => typeof value === 'string') as string[];
}

export function getEnumKey(value: string, myEnum: any) {
    return Object.keys(myEnum).filter(key => value === myEnum[key])[0];
}
