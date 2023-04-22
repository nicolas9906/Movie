import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../hooks/useAuthStore';

export const Navbarr = () => {

    
    return (
        


        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                  <span className='nav-item nav-link text-info'>
                  
                  </span>
                  <NavLink 
                          
                          className={ ( {isActive}) => "nav-item nav-link" + (isActive ? 'active' : '')  }                   
                         
                          to="/Login"
                      >
                          Iniciar sesion
                      </NavLink>
     
                </ul>
            </div>
        </nav>
          
    );
}
