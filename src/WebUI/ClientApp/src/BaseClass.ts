import authService from "./components/api-authorization/AuthorizeService";


export class BaseClass {

    protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {
        let token =await authService.getAccessToken(); // your custom logic to get the token

        options.headers = {
            ...options.headers,
            Authorization: 'Bearer ' + token,
        };
        return Promise.resolve(options);
    };
}