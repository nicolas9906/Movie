import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginScreen } from '../Componentes/Login/Login';
import {PrivateRoute} from '../router/PrivateRoute';
import { useAuthStore } from '../hooks/useAuthStore';
import {App} from '../Movie'
import { Navbarr } from '../Componentes/navbar/Navbar';
import { Navbar2 } from '../Componentes/navbar/navbar2';
import { Registro } from '../Componentes/Registro/Registro';



export const AppRouter = () => {

  
    const { status, checkAuthToken,user } = useAuthStore();
    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, [])
    


    if ( status === 'checking' ) {
        return (
            <h3>Cargando...</h3>
        )
    }

    

    
    return (
        
        <Routes>
            {
                ( status === 'not-authenticated')  
                    ? (
                            <>
                            <Route path="/*" element={ <App/> } />
                            <Route path="/Login" element={ <LoginScreen/> } />
                            <Route path="/Login" element={ <Navbarr/> } />
                            <Route path="/registro" element={ <Registro/> } />
                        </>
                    )
                     : (
                        
                        <>
                        {(user.rol === 'ADMIN_ROLE')
                        ?(
                            <>
                                <Route 
                                path='/*'
                                element={ <PrivateRoute rol={'ADMIN_ROLE'}>
                           
                                </PrivateRoute>} /> 
                                {/* <Route path='/prestamo' element={<Prestamo/>} /> */}
                               
                                </>
                        )
                        :(
                                <>
                            <Route path='/*' element={<App/>} /> 
                            <Route path="/" element={ <Navbar2/> } />
                                </>
                        )
                        }
                               
                        </>
                        )
                       
                    
            }
            

        </Routes>
    )
}
