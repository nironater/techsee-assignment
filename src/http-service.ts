import { Tester } from "./models";

const server = 'https://test-api.techsee.me/api/ex';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export function getResource<T>(resource: string): Promise<T> {
    const res = makeRequest(resource, 'GET');
    return res;
};

export function putResource(resource: string): Promise<any> {
    const res = makeRequest(resource, 'PUT');
    return res;
};

export const makeRequest = (resource: string, method: RequestMethod) => {
    return fetch(`${server}/${resource}`, { method: method })
        .then(response => {
            return response.json();
        })
};

// Use when server is not reachable - Mock for developement
export function getResourceMock(resource: string): Promise<Tester[]> {
    return new Promise<Tester[]>(
        (resolve, reject) => {
            resolve(
                [
                    {
                        firstName: "aaa",
                        lastName: "yyy",
                        country: "Israel",
                        bugs: [
                            {
                                id: 1,
                                title: "sample bug"
                            },
                            {
                                id: 2,
                                title: "sample bug 2"
                            }
                        ]
                    },
                    {
                        firstName: "bbbbb",
                        lastName: "xxxx",
                        country: "Usa",
                        bugs: [
                            {
                                id: 1,
                                title: "best bug"
                            },
                            {
                                id: 2,
                                title: "worst bug"
                            }
                        ]
                    },
                ] as Tester[]
            );
        }
    )
};