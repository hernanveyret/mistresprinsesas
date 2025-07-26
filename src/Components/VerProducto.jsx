import React, { useState, useEffect} from 'react'
import './verProducto.css'

const VerProducto = ({verProducto,
                      setIsVerProducto, 
                      favoritos, 
                      addFavorito,
                      agregarProductoAlCarrito,
                      checkProductoEnCarito,
                      formatoPesos
                      }) => {  
  
  return (
    <div className="container-ver-producto">      
      <div className="card" >
        <div className="imagen">
          <button
            className="btn-nav-productos card-btn"
              type="button"
              onClick={() => { setIsVerProducto(false)}}
            >
          <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#000000">
              <path d="m256-236-20-20 224-224-224-224 20-20 224 224 224-224 20 20-224 224 224 224-20 20-224-224-224 224Z"/>
            </svg>
          </button>
          <img src={verProducto.urlImg} alt={verProducto.titulo} />
        </div>
        <div className="info">
          <p style={{fontWeight:'600'}}>{verProducto.titulo}</p>
          <p  style={{fontSize:'14px',fontWeight:'400'}}>{verProducto.descripcion}</p>
          {
            verProducto.oferta ? 
            <div className="info-precios">
            <span 
              className="ver-productos-precios"
              style={
                {display:'flex',
                 gap:'10px'
                }}>
              <p 
                style={
                  {color:'grey',
                   textDecoration:'line-through'
                  }}>
                {formatoPesos(Number(verProducto.precioUnitario))}
                </p>
                <p 
                  style={
                    {color: 'red'
                    }}>
                      {verProducto.porcentajeOff}
                      % OFF
                </p>
              { verProducto.precio && verProducto.porcentajeOff && (
                <p style={{fontSize:'16px', fontWeight:'600'}}>
                  {formatoPesos(verProducto.precio)}
                </p>
               )}
            </span>

            
          </div>
            :
            <div className="info-precios">
            <p style={{fontSize:'18px', fontWeight:'600'}}>{formatoPesos(verProducto.precio)}</p>
            </div>
          }
           </div>
      <nav className="btn-ver-producto">
        { 
          checkProductoEnCarito(verProducto.id) ? 
          <button 
            className="btn-nav-productos" 
            type="button"
            onClick={() => {agregarProductoAlCarrito(verProducto.id) }}
          >
          <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="green">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
          </button>
          : 
          <button 
            className="btn-nav-productos" 
            type="button"
            onClick={() => {agregarProductoAlCarrito(verProducto.id) }}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="black"
          >
            <path d="M466-466H252v-28h214v-214h28v214h214v28H494v214h-28v-214Z" />
          </svg>
          </button>
        }
          <button
            className="btn-nav-productos"
            type="button"
            onClick={() => addFavorito(verProducto.id)}
          >
        { favoritos.find((f) => f.id === verProducto.id) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#EA3323"
            >
              <path d="m480-190-22-20q-97-89-160.5-152t-100-110.5Q161-520 146.5-558T132-634q0-71 48.5-119.5T300-802q53 0 99 28.5t81 83.5q35-55 81-83.5t99-28.5q71 0 119.5 48.5T828-634q0 38-14.5 76t-51 85.5Q726-425 663-362T502-210l-22 20Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="m480-190-22-20q-97-89-160.5-152t-100-110.5Q161-520 146.5-558T132-634q0-71 48.5-119.5T300-802q53 0 99 28.5t81 83.5q35-55 81-83.5t99-28.5q71 0 119.5 48.5T828-634q0 38-14.5 76t-51 85.5Q726-425 663-362T502-210l-22 20Zm0-38q96-87 158-149t98-107.5q36-45.5 50-80.5t14-69q0-60-40-100t-100-40q-48 0-88.5 27.5T494-660h-28q-38-60-78-87t-88-27q-59 0-99.5 40T160-634q0 34 14 69t50 80.5q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
        )}
        </button>
        
      </nav>
      </div>
      
    </div>
  )
};
export default VerProducto;