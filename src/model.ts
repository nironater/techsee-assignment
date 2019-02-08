export interface Tester {
    firstName: string;
    lastName: string;
    country: string;
    device?: string; // doesn't appear in assignment but exists in server's response
    bugs: Bug[]
}

export interface Bug {
    id: number;
    title: string;
}