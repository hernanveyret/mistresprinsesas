import React, { useEffect } from 'react';
import './bannerAddProducto.css';

const BannerAddProducto = ({ setOnClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setOnClose(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setOnClose]);

  return (
    <div className="modal-backdrop">
      <div className="modal-card animate">
        <img src="/img/carrito2.png" alt="Producto agregado" className="carrito-animado" />
        <p className="modal-text">¡Se agrego a tu carrito!</p>
      </div>
    </div>
  );
};

export default BannerAddProducto;