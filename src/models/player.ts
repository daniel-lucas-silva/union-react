export interface IPlayer {
    id?: number;
    email: string;
    nick: string;
    avatar: string;
    agent: string;
    data?: IPlayerData;
    address?: IPlayerAddress;
    createdAt: Date;
}

export interface IPlayerData {
    name: string;
    phone: string;
    cpf: string;
    rg: string;
    birthdate: Date;
    gender: 1 | 0;
}

export interface IPlayerAddress {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}
