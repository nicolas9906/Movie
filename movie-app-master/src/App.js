import React from "react";
import { store } from './store/store';
import { AppRouter } from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";


export const  App = () => {
  return (
    <Provider store={ store }> 
    <BrowserRouter>
         <AppRouter/>
         </BrowserRouter>
         </Provider>

  );
}


