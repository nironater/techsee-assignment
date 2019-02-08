const server = 'https://test-api.techsee.me/api/ex';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export function getResource<T>(resource: string): Promise<T> {
    return makeRequest(resource, 'GET');
};

export const makeRequest = (resource: string, method: RequestMethod): Promise<any> => {
    return fetch(`${server}/${resource}`, { method: method })
        .then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) {
                    response.json()
                        .then(result => {
                            resolve(result);
                        })
                        .catch(result => {
                            resolve(null);
                        })
                } else {
                    reject(response);
                }
            });
        })
};