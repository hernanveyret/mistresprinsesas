import React,{ useEffect } from 'react';
import './sharedConfirm.css'

const ConfirmReturnProduct = ({ isExiste, setIsExiste}) => {

  return (
    <section className="container-shared">
      {
        !isExiste ?
      <div className="container-shared-text">      
        <p>Su pedido ya esta en el carrito</p>   
      </div> 
      :
       <div className="container-shared-text-error">
        <p>Su pedido ya esta en el carrito</p>
         <p>Algunos productos ya no se encuentran disponibles</p>         
       </div>
          
      }
    </section>
  )
}
export default ConfirmReturnProduct;