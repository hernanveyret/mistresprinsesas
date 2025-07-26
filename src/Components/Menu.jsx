import React, { useState } from 'react';
import './menu.css';

const Menu = ({ openMenu, 
                setOpenMenu, 
                sharedApp, 
                setIsMisPedidos, 
                setIsHome, 
                setIsCarrito, 
                setIsSharedConfirm, 
                setTextoCompartir,
                setOnQr
              }) => {

 
  //Compartir alias o cvu del producto en la url
  const handleCompartir = (text) => {
    let url = ''
    if(text === 'Alias'){
      setTextoCompartir('Alias')
      url = 'hernanveyret.mp'
    }else {
      setTextoCompartir('CVU/CBU')
      url = '0000003100083084244362'
    }
    navigator.clipboard.writeText(url)
      .then(() => {
        //setTexto(text)
         setIsSharedConfirm(true)
        setTimeout(() => {
       setIsSharedConfirm(false)
      }, 3000);     
      })
      .catch(() => alert("No se pudo copiar"));
  };

  return (
    <div className="menu-container">
     
      <div className={`menu ${openMenu ? 'open' : ''}`}>
        <ul>
          <li>
            <button
            onClick={() => { 
              setOpenMenu((prev) => !prev);
              sharedApp();
            }}
            >Compartir App por link
            </button>
          </li>
          <li>
            <button
            onClick={() => { 
              setOpenMenu((prev) => !prev);
              setOnQr(true)           
            }}
            >Compartir App por QR
            </button>
          </li>
          <li>
            <button
            onClick={() => { 
              setOpenMenu((prev) => !prev);
              setIsMisPedidos(true);
              setIsHome(false);
              setIsCarrito(false)
              } 
            }
            >Mis pedidos
            </button>
          </li>
          <li><button
            onClick={() => { 
              setOpenMenu((prev) => !prev);
              handleCompartir('cvu/cbu')
            }}
          >CVU/CBU</button></li>
          <li><button
            onClick={() => { 
              setOpenMenu((prev) => !prev);
              handleCompartir('Alias')
            }}
          >Alias</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
