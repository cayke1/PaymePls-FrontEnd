import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { redirect } from 'next/navigation';

export const RequireAuth = ({children} : {children: JSX.Element}) => {
    const auth = useContext(AuthContext);
    let token: string = '';
    if(typeof window !== 'undefined'){
        token = localStorage.getItem('token')?.toString() || '';
    }
    useEffect(() => {
        if(!auth.token && !token){
            redirect('/login');
        }
    }, [auth.token, token]);

    return children;
}