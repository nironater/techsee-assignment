export interface Tester {
    firstName: string;
    lastName: string;
    country: string;
    bugs: Bug[]
}

export interface Bug {
    id: number;
    title: string;
}