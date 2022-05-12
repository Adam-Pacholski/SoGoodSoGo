export interface Country{
    docID?: string;
    name: string;
    lat: number;
    long: number;
    capital?: string;
    wish?:boolean;
    list?:boolean;
}