import { Tester } from "../model";
import { getResource } from "./http-service";

const isMock = false;

export function searchTester(resource: string): Promise<Tester> {
    if (isMock) {
        return searchTesterMock(resource);
    } else {
        return getResource<Tester>(resource);
    }
};

export function getAllTesters(): Promise<Tester[]> {
    if (isMock) {
        return getAllTestersMock();
    } else {
        return getResource<Tester[]>('all');
    }
};


/* Use when server is not reachable - Mocks for developement only */

export function searchTesterMock(tester: string): Promise<Tester> {
    return new Promise<Tester>(
        (resolve, reject) => {
            resolve(
                {
                    firstName: tester,
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
                }
            );
        }
    )
};

export function getAllTestersMock(): Promise<Tester[]> {
    return new Promise<Tester[]>(
        (resolve, reject) => {
            resolve(
                [
                    {
                      "firstName": "Melisa",
                      "lastName": "Kadosh",
                      "country": "Israel",
                      "device": "iPhone 6",
                      "bugs": [
                        {
                          "id": 1,
                          "title": "button misplaced"
                        },
                        {
                          "id": 4,
                          "title": "incorrect home page"
                        }
                      ]
                    },
                    {
                      "firstName": "Lynda",
                      "lastName": "Golumb",
                      "country": "New Zealand",
                      "device": "Huawei P10",
                      "bugs": [
                        {
                          "id": 2,
                          "title": "device is stuck"
                        },
                        {
                          "id": 3,
                          "title": "can't load application"
                        },
                        {
                          "id": 5,
                          "title": "no input validation"
                        }
                      ]
                    },
                    {
                      "firstName": "Artem",
                      "lastName": "Puzailov",
                      "country": "Ukraine",
                      "device": "Galaxy S7",
                      "bugs": [
                        {
                          "id": 7,
                          "title": "Chrome displays jibberish"
                        }
                      ]
                    },
                    {
                      "firstName": "Rob",
                      "lastName": "Rabbi",
                      "country": "UK",
                      "device": "Xiomi Note 5",
                      "bugs": [
                        {
                          "id": 11,
                          "title": "invalid text"
                        },
                        {
                          "id": 21,
                          "title": "shifted display"
                        },
                        {
                          "id": 13,
                          "title": "mis aligned buttons"
                        },
                        {
                          "id": 15,
                          "title": "server crash"
                        }
                      ]
                    },
                    {
                      "firstName": "Neved",
                      "lastName": "Dorsell",
                      "country": "Sweden",
                      "device": "Nokia D56",
                      "bugs": [
                        {
                          "id": 13,
                          "title": "slow loading"
                        },
                        {
                          "id": 16,
                          "title": "pixeled video"
                        }
                      ]
                    },
                    {
                      "firstName": "Silvi",
                      "lastName": "Rushfeld",
                      "country": "Germany",
                      "device": "LG G5",
                      "bugs": [
                        {
                          "id": 11,
                          "title": "blank end page"
                        }
                      ]
                    },
                    {
                      "firstName": "Will",
                      "lastName": "Debill",
                      "country": "US",
                      "device": "iPhone X",
                      "bugs": [
                        {
                          "id": 11,
                          "title": "login stuck"
                        },
                        {
                          "id": 21,
                          "title": "shifted display"
                        }
                      ]
                    }
                  ] as Tester[]
            );
        }
    )
};