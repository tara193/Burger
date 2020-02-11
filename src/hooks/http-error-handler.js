import {useState, useEffect} from 'react';

export default httpClient => {

    const [error, setError] = useState();
    
    const reqInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    });
    const resInteceptor = httpClient.interceptors.response.use(response => response, error => {
        setError(error);
    });

    useEffect(() => {
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInteceptor);
    }, [reqInterceptor, resInteceptor])



    const errorConfirmedHandler = () => {
        setError(null);
   }
   return[error, errorConfirmedHandler];
};