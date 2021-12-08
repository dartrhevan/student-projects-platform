import {randomInt} from "../utils/utils";


const max = 0xFFFFFF / 3;
const min = 0x100000; //TODO: remove

export default class Tag {
    constructor(public id: number, public name: string, public color = randomInt(min, max)) {
        this.backgroundColor = '#' + color.toString(16);
        this.fontColor = '#FFFFFF';// (max - colour).toString(16);
    }

    public readonly backgroundColor: string;
    public readonly fontColor: string;


};
