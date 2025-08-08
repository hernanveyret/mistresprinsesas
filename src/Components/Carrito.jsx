import React, { useState, useEffect } from 'react';
import './carrito.css';

const Carrito = ({ setIsCarrito,
                    setIsHome,
                    productosEnCarrito,
                    setProductosEnCarrito,
                    costoEnvio,
                    setCantTotal,
                    cantTotal,
                    setOnEnviarPedido,
                    formatoPesos,
                    isRetiro,
                    setIsRetiro        
                    }) => {   
  // Suma la cantidad de productos unitarios en el carrito de compras.
 const sumarProductoUnitario = (id) => {
  const sumaCantidad = productosEnCarrito.map(e => {
    if( e.id === id ) {
      return {
        ...e,
        cant: e.cant + 1,
        total: e.total + e.precio
      }
    }
    return e;
  })
  setProductosEnCarrito(sumaCantidad)
 }

  // Suma la cantidad de productos unitarios en el carrito de compras.
 const restarProductoUnitario = (id) => {
  const restarCantidad = productosEnCarrito.map(e => {
    if( e.id === id ) {
      return {
        ...e,
        cant: e.cant - 1,
        total: e.total - e.precio
      }
    }
    return e;
  })
  setProductosEnCarrito(restarCantidad)
 }

 const eliminarProductoUnitario = (id) => {
  const filter = productosEnCarrito.filter(pro => pro.id !== id);
  setProductosEnCarrito(filter)
 }

  const subtotal = productosEnCarrito.reduce((acc, prod) => Number(acc) + Number(prod.total), 0);
  const envio = subtotal > 50000 ? 0 : Number(costoEnvio.envio.envio); // ejemplo: envío gratis si pasa $50.000
  const total = !isRetiro ? subtotal + envio :  subtotal

  return (
    <div className="container-carrito">
      {productosEnCarrito.length > 0 ? (
        <>
          <div className="carrito-izquierda">
            {productosEnCarrito.map((pro) => (
              <section className="contenedor-productos-carrito" key={pro.id}>
                <div className="card-carrito">
                  <div className="img-carrito">
                    <img src={pro.urlImg} alt={pro.titulo} />
                  </div>
                  <div className="info-carrito">
                      <p className="titulo">{pro.titulo}</p>
                    <div className='contenedor-precios'>
                      { pro.precioUnitario && !pro.porcentajeOff && <p className='precio-unit'>Pre.Unit: {formatoPesos(Number(pro.precioUnitario))}</p>}
                      
                        { pro.porcentajeOff && <p style={{color:'red', fontSize:'14px'}}>{pro.porcentajeOff}% OFF</p> }
                        { pro.porcentajeOff 
                          ?
                          <span className='span'>
                            <p className="tachado">
                              {formatoPesos(Number(pro.precioUnitario))}
                            </p>
                            <p className="precio">
                              {formatoPesos(pro.total)}
                            </p> 
                          </span>
                          : 
                            <p className="precio">
                              {formatoPesos(pro.total)}
                            </p> 
                        }
                      
                    </div>
                    <div className="btn-nav">                      
                      { /* boto +*/}
                      <button
                      type="button"
                      onClick={() => { sumarProductoUnitario(pro.id)}}
                      className="btn-carrito"
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="#000000">
                          <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z"/>
                      </svg>
                      </button>
                      <p>{pro.cant}</p>
                        { 
                          pro.cant === 1 ?
                           // boton tacho de basura
                            <button
                              type="button"
                              onClick={() => { eliminarProductoUnitario(pro.id)}}
                              className="btn-carrito"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" 
                                height="24px" 
                                viewBox="0 -960 960 960" width="24px" 
                                fill="#000000">
                                <path d="M312-172q-25 0-42.5-17.5T252-232v-488h-40v-28h148v-28h240v28h148v28h-40v488q0 26-17 43t-43 17H312Zm368-548H280v488q0 14 9 23t23 9h336q12 0 22-10t10-22v-488ZM402-280h28v-360h-28v360Zm128 0h28v-360h-28v360ZM280-720v520-520Z"/>
                              </svg>
                            </button>
                          :
                            // boton restar cantidad de producto unitario
                          <button
                            onClick={() => { restarProductoUnitario(pro.id)}}
                            className="btn-carrito"                            
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" 
                              height="24px" 
                              viewBox="0 -960 960 960" 
                              width="24px" 
                              fill="#000000">
                                <path d="M252-466v-28h456v28H252Z"/>
                            </svg>
                          </button>

                        }
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <aside className="contenedor-importe">
  <h3>Resumen de compra</h3>

  <p>
    <strong>Subtotal:</strong> {formatoPesos(subtotal)}
  </p>

  {/* Retiro en persona */}
  <p>
    <strong>
      <label>
        <input type="radio" name="envio" 
          style={{ marginRight: '5px' }}
          checked={isRetiro === true}
          onChange={() => setIsRetiro(true)}
        />
        {isRetiro ? (
          <span>Retiro en persona</span>
        ) : (
          <span style={{ textDecoration: 'line-through', color: 'grey' }}>
            Retiro en persona
          </span>
        )}
      </label>
    </strong>
    { isRetiro ? (
      <span>$ 0</span>
    ) : (
      <span style={{ textDecoration: 'line-through' }}>$ 0</span>
    )}
  </p>

  {/* Envío */}
  <p>
    <strong>
      <label>
        <input type="radio" name="envio"
          style={{ marginRight: '5px' }}
          checked={isRetiro === false}
          onChange={() => setIsRetiro(false)}
        />
        { isRetiro ? (
          <span style={{ textDecoration: 'line-through', color: 'grey' }}>
            Envío:
          </span>
        ) : (
          <span>Envío:</span>
        )}
      </label>
    </strong>
    {isRetiro ? (
      <span style={{ textDecoration: 'line-through' }}>
        {formatoPesos(Number(costoEnvio.envio.envio))}
      </span>
    ) : (
      <span>{formatoPesos(Number(costoEnvio.envio.envio))}</span>
    )}
  </p>

  <p>
    <strong>Total Pro: </strong> {Number(cantTotal)}
  </p>

  <p>
    <strong>Total:</strong> {formatoPesos(total)}
  </p>

  <button
    className="btn-vaciar-carrito"
    onClick={() => {
      setProductosEnCarrito([]);
    }}
  >
    VACIAR CARRITO
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="white"
    >
      <path d="M312-172q-25 0-42.5-17.5T252-232v-488h-40v-28h148v-28h240v28h148v28h-40v488q0 26-17 43t-43 17H312Zm368-548H280v488q0 14 9 23t23 9h336q12 0 22-10t10-22v-488ZM402-280h28v-360h-28v360Zm128 0h28v-360h-28v360ZM280-720v520-520Z" />
    </svg>
  </button>

  <button
    className="btn-pagar"
    onClick={() => {
      setOnEnviarPedido(true);
    }}
  >
    CONFIRMAR
  </button>
</aside>

        </>
      ) : (
        <img src="./img/carritoVacio.webp" alt="Logo carrito vacío" className="carrito-vacio" />
      )}
    </div>
  );
};

export default Carrito;
