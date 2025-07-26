import React, { useState, useEffect}  from 'react';
import './misPedidos.css';

const MisPedidos = ({ misPedidosGuardados, 
                      setMisPedidosGuardados, 
                      formatoPesos, 
                      productos,
                      setProductosEnCarrito,
                      productosEnCarrito,
                      setIsReturnPedido
                    }) => {
  const [ isDelete, setIsDelete ] = useState(false);
  const [ iIndex, setIindex ] = useState(null);

  //Retornar productos al carrito de mis pedidos guardados
 const retornarProductos = (indice) => {
  const nuevos = [...productosEnCarrito]; // Copia del carrito actual

  misPedidosGuardados[indice].forEach(pro => {
    const existe = productos.find(p => p.id === pro.id); // Verifica si existe en productos

    if (existe) {
      const indexEnCarrito = nuevos.findIndex(p => p.id === pro.id);

      if (indexEnCarrito !== -1) {
        // Si ya esta en el carrito se suma la cantidad
        nuevos[indexEnCarrito].cant += pro.cant || 1;
      } else {
        // Si no esta solo se agrega
        nuevos.push({ ...pro });
      }
    }
  });

  setProductosEnCarrito(nuevos);
  timerBanner();
};

  const timerBanner = () => {
    setIsReturnPedido(true);
    setTimeout(() => {
      setIsReturnPedido(false)
    },3000);
  };

  const IsDeletepedido = ({iIndex}) => {
    return (      
      <div className="container-delete">
        <div className="cuadro">
        <div className='delete-texto'>
          <p>¿Estás seguro de querer borrar este pedido?</p>
        </div>
        <div className="container-delete-btn">
          <button className="btn-delete"
            onClick={() => {
              borrarPedido(iIndex);
              setIsDelete(false);
            }}
          >Si</button>
          <button className="btn-delete"
            onClick={() => { setIsDelete(false) }}
          >No</button>
        </div>
        </div>
      </div>
    )
  }

  const  borrarPedido = (indice) => {  
    console.log(indice)  
    const filter = misPedidosGuardados.filter((pedido, index) => {
      if(index !==indice) return pedido
    })
    setMisPedidosGuardados(filter)
  }

  return (
    <div className='container-mis-pedidos'>
      { isDelete && 
         <IsDeletepedido
          iIndex={iIndex}
         />
      }
      <h2>Mis pedidos</h2>
      { misPedidosGuardados.length > 0 ?
        misPedidosGuardados.map((pedido, iPedido) => {
          const indiceTotal = pedido.length;

          return (
            <div className='mis-pedidos' key={iPedido}>
              <h3 className='titulo-h3'>Pedido: #{iPedido + 1} - <span style={{fontSize:'16px', fontWeight:'400'}}>{pedido[indiceTotal-1].fecha}</span></h3>
              <div className="container-info">
                <div className="productos">
                  {pedido.map((pe, index) => (
                    <div className='mis-pedidos-info' key={`${iPedido}-${pe.id || index}`}>
                      <ul>
                        <li>{pe.titulo && <p>{pe.titulo}</p>}</li>
                        <li>{pe.cant && <p>Cant: {pe.cant}</p>}</li>
                        <li>{pe.precioUnitario && <p>Pre.Unit: {formatoPesos(Number(pe.precioUnitario))}</p>}</li>
                        <li>{pe.total && <p>Total: {formatoPesos(pe.total)}</p>}</li>
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="container-total">
                  <h3>Resumen de compra</h3>
                  <p className="resumen-linea"><span>Cant. Total:</span> <span>{pedido[indiceTotal - 1].cantTotal}</span></p>
                  <p className="resumen-linea"><span>Envio:</span> <span>{formatoPesos(Number(pedido[indiceTotal - 1].costoEnvio))}</span></p>
                  <p className="resumen-linea"><span>Sub Total:</span> <span>{formatoPesos(pedido[indiceTotal - 1].subTotal)}</span></p>
                  <p className="resumen-linea"><span>Total:</span> <span>{formatoPesos(pedido[indiceTotal - 1].importeTotal)}</span></p>                  
                <div className="botones-acciones">
                    { /* Retornar */}
                  <button 
                    onClick={() => { retornarProductos(iPedido)}}
                    title="Retornar al carrito"
                    className="btn-mis-pedidos">                 
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      height="24px" 
                      viewBox="0 -960 960 960" width="24px" 
                      fill="#000000">                   
                        <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/>                 
                    </svg>               
                  </button>
                    { /* Borrar */}           
                  <button
                    onClick={() => { 
                      setIindex(iPedido) 
                      setIsDelete(true);
                    }}
                    title="Borrar"
                    className="btn-mis-pedidos">                 
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      height="24px" 
                      viewBox="0 -960 960 960" 
                      width="24px" fill="#000000">                   
                        <path d="M312-172q-25 0-42.5-17.5T252-232v-488h-40v-28h148v-28h240v28h148v28h-40v488q0 26-17 43t-43 17H312Zm368-548H280v488q0 14 9 23t23 9h336q12 0 22-10t10-22v-488ZM402-280h28v-360h-28v360Zm128 0h28v-360h-28v360ZM280-720v520-520Z"/>                 
                    </svg>               
                  </button> 
                </div>
                </div>
              </div>
            </div>
          );
        }
      )
       :
       <h4 style={{color: 'grey', textAlign:'center'}}>No tenes pedidos guardados.</h4>
      }      
      </div>
    );
    
};

export default MisPedidos;

