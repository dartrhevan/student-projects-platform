import React, {ChangeEvent} from "react";
import {refreshToken} from "../api/auth";

export function getOnFieldChange(setter: (v: string) => void) {
    return (e: ChangeEvent<HTMLInputElement>) => setter((e.currentTarget as HTMLInputElement).value);
}

export function allNotEmpty(...values: any[]) {
    return values.every(e => e && e.length > 0);
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

export function defErrorHandler(r: Response, template: string) {
    return r.json().catch(r => {
        throw new Error(`Непредвиденная ошибка`)
    }).then(m => {
        throw new Error(`${template}: ${m.message}`);
    });
}

export function getDefaultDownloadHandler(template = 'Ошибка получения данных') {
    return (r: Response) => {
        if (!r.ok) {
            return defErrorHandler(r, template);
        }
        return r.json();
    }
}

export function getDefaultUploadHandler(template = 'Ошибка отправки данных') {
    return (r: Response) => {
        if (r.ok) {
            return {};
        } else {
            return defErrorHandler(r, template);
        }
    };
}

export function toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64Index = result.indexOf('base64')
            resolve(result.substr(base64Index + 7));
        };
        reader.onerror = error => reject(error);
    })
};

export function correctNumericInput(e: React.FormEvent<HTMLDivElement>) {
    const target = (e.target as HTMLInputElement);
    const val = parseInt(target.value);
    if (val < 1) {
        target.value = '1';
        return 1;
    }
    return val;
}
