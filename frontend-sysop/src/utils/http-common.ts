export const request = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> =>{

    const runtimeConfig = useRuntimeConfig()
    const token = useCookie('token'); // useCookie new hook in nuxt 3
    const config = {...init}
    const new_headers = new Headers(config.headers); 
    new_headers.append("Authorization", 'Bearer ' + token.value);
    config.headers = new_headers;
    const url = `${runtimeConfig.public.API_ENDPOINT}${input}`
    return fetch(url, config);
}