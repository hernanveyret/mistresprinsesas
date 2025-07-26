import React, { useEffect } from 'react';


const LinkCopiado = ({msj}) => {
   
  return (
    <div className="modal">
      <div className="card-modal animates">
        <img src="/img/cadenaLink.png" alt="Link copiado" className="carrito-animado-dos" />
        <p className="modal-text">{ msj ? msj : '¡Link copiado al portapapeles!'}</p>
      </div>
    </div>
  );
};

export default LinkCopiado;