import {TableSource} from "./tableSource";

export interface IBank extends TableSource {
    id?: number;
    name: string;
    ag: string;
    cc: string;
    type: string;
    balance: number;
    managerName: string;
    managerEmail: string;
    managerPhone: string;
    createdAt?: Date|number;
}
