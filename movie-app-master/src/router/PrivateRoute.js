import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom'

 
export const PrivateRoute = ({children}) => {
  const { uid,rol } = useSelector(state => state.auth);
   
  return uid, rol==='ADMIN_ROLE'
        ? <Navigate to="/Adm"/>
        : children
 
}