import React, { useEffect } from 'react';

import '../../Componentes/Login/Login.css'
import movie from './img/movie.jpg'
import email from './img/email.png';
import pass from './img/pass.png';
import Swal from 'sweetalert2';
import  { useAuthStore } from '../../hooks/useAuthStore';
import {useForm} from '../../hooks/useForm';
import { Redirect } from 'react-router-dom'


const loginFormFields = {
  correo:    '',
  lpassword: '',
}

export const LoginScreen = () => {


  const { startLogin, errorMessage} = useAuthStore();

  const { correo, lpassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
  

  const loginSubmit = ( event ) => {
      event.preventDefault();
      startLogin({ correo: correo, password:lpassword });
  }


  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }    
  }, [errorMessage])



  

  return (

    
    <div className="main">
     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src={movie} alt="profile" className="profile"/>
           </div>
         </div>
         <div>
           <h1>Bienvenido</h1>
          <form onSubmit={ loginSubmit }> 
           <div>
             <img src={email} alt="email" className="email"/>
             <input 
             type="text"
              placeholder="Correo" 
              className="name"
              name="correo"
              value={correo}
              onChange={ onLoginInputChange }
              />
           </div>
           <div className="second-input">
             <img src={pass} alt="pass" className="email"/>
             <input 
             type="password"
              placeholder="Contraseña"
              name='lpassword'
              value={ lpassword }
              onChange= {onLoginInputChange }
               className="name"
               
               />
           </div>
          <div className="login-button">
          <input 
          type='submit'
          className='btnSubmit'
          value='Login'
          />
          </div>
          <button>
          <Redirect to="/registro" />
          </button>
        </form>
         </div>
       </div>
       

     </div>
    </div>
  );
}
