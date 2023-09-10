// Generated by https://quicktype.io

export interface IChampion {
    codigo?:     string;
    id:          string;
    key:         string;
    name:        string;
    title:       string;
    tags:        Tag[] | Tag;
    icon:        string;
    sprite:      string;
    description: string;
}

export enum Tag {
    Assassin = "Assassin",
    Fighter = "Fighter",
    Mage = "Mage",
    Marksman = "Marksman",
    Support = "Support",
    Tank = "Tank",
}

