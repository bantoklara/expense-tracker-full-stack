
const useFetchWrapper = () => {

    const request = (method) => {
        return (url, body, contentType) => {
            const requestOptions = {
                method,
                headers: {}
            };

            if (body) {
                if (!contentType) {
                    requestOptions.headers.Accept = "application/json";
                    requestOptions.headers["Content-Type"] = "application/json";
                }
                requestOptions.body = body;
            }
            return fetch(url, requestOptions);
        };
    }

    return {
        get: request("GET"),
        post: request("POST"),
        put: request("PUT"),
        delete: request("DELETE"),
        patch: request('PATCH')
    };
}
export { useFetchWrapper };