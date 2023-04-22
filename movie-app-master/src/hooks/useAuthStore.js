import { useDispatch, useSelector } from 'react-redux';
import { Api } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ correo, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await Api.post('/auth/login',{ correo, password });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ 
                name: data.nombre,
                 uid: data.uid, 
                 rol:data.rol
                }) );
            
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({ correo,password, name }) => {
        dispatch( onChecking() );
        try {
            const { data } = await Api.post('/usuarios',{ correo,password, name });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.nombre, uid: data.uid }) );
            
        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || '--' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }


    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await Api.get('auth/renew');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({  name: data.nombre,
                uid: data.uid, 
                rol:data.rol}) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        
        dispatch( onLogout() );
    }



    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}