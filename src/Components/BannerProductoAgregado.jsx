import React, { useEffect } from 'react';
import './bannerProductoAgregado.css';

const BannerProductoAgregado = ({ setOnRepetido }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setOnRepetido(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [setOnRepetido]);
  return (
    <div className="modal">
      <div className="card-modal animates">
        <img src="/img/carrito2.png" alt="Producto agregado" className="carrito-animado-dos" />        <p className="modal-text">¡Producto ya agregado!</p>
      </div>
    </div>
  );
};

export default BannerProductoAgregado;