import React,{ useState, useEffect} from 'react';
import SharedConfirm from './SharedConfirm';

import './enviarPedido.css';
import { useForm } from 'react-hook-form'

const EnviarPedido = ({productosEnCarrito,
                       setProductosEnCarrito,
                       setOnEnviarPedido,
                       costoEnvio, 
                       setIsHome,
                       setIsCarrito,
                       setMisPedidosGuardados,
                       misPedidosGuardados
                      }) => {
  const [ isShared, setIsShared ] = useState(false)
  const [ texto, setTexto ] = useState(null)
  const [ mp, setMp ] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const guardarProducto = () => {
   const totalProductos = productosEnCarrito.reduce((ac, prod) => ac + prod.cant, 0);
   const subTotal = productosEnCarrito.reduce((ac, prod) => ac + (prod.cant * prod.precio), 0);
   const importeTotal = Number(subTotal) + Number(costoEnvio.envio.envio);
   const fecha = new Date().toLocaleDateString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
    });

    let pedidos = []
   
    productosEnCarrito.forEach((pro, index) => {
      pedidos.push(pro)     
    })

    pedidos.push({
      fecha,
      cantTotal: totalProductos,
      costoEnvio: costoEnvio.envio.envio,
      subTotal,
      importeTotal
    });
  setMisPedidosGuardados([...misPedidosGuardados, pedidos] )
  }

  const enviar = () => {
   const totalProductos = productosEnCarrito.reduce((ac, prod) => ac + prod.cant, 0);
   const subTotal = productosEnCarrito.reduce((ac, prod) => ac + (prod.cant * prod.precio), 0);
   const importeTotal = Number(subTotal) + Number(costoEnvio.envio.envio)
  
    let pedido = 'Hola, Quiero Hacer un pedido:\n';
    productosEnCarrito.forEach((pro, index) => {
      pedido += `*Producto: ${index+1}*\n`;
      pedido += `${pro.titulo}\n`
      pedido += `Cant: ${pro.cant}\n`
      pedido += `$ ${pro.precio}\n`
      pedido += `*-------------------*\n`
    })
     pedido += `Cant. Productos: ${totalProductos}\n`;
     pedido += `Costo envio: $${costoEnvio.envio.envio}\n`;
     pedido += `Total a pagar: $${importeTotal}\n`;
     pedido += `Medio de pago: ${mp || ''}\n`;
     pedido += `*Nombre: ${watch('nombre')}*\n`;
     pedido += `Direccion: ${watch('direccion')}\n`;   
    
    handleEnviarWhatsApp(pedido)
    reset();
    guardarProducto(productosEnCarrito)
    setProductosEnCarrito([])
    setOnEnviarPedido(false)
    setIsCarrito(false)
    setIsHome(true)
  }
  
  const handleEnviarWhatsApp = (pedido) => {    
  const numeroVendedor = "541134025499"; // con código país, sin +
  const url = `https://wa.me/${numeroVendedor}?text=${encodeURIComponent(pedido)}`;
  window.open(url, "_blank");
};

 //Compartir id del producto en la url
  const handleCompartir = (text) => {
    let url = ''
    if(text === 'Alias'){
      url = 'hernanveyret.mp'
    }else {
      url = '0000003100083084244362'
    }
    navigator.clipboard.writeText(url)
      .then(() => {
        setTexto(text)
        setIsShared(true);
        setTimeout(() => {
          setIsShared(false)
        },3000)    
      })
      .catch(() => alert("No se pudo copiar"));
  };
  
  return (
    <div className="container-envio">
      {
        isShared &&
        <SharedConfirm 
        texto={texto}
        />
      }
  <form 
    onSubmit={handleSubmit(enviar)}
  className="formulario-envio">
  <h4>Ingrese sus datos</h4>
    <button
      type="button"
      className="btn-cerrar"
      onClick={() => setOnEnviarPedido(false)}
    >
      ✕
    </button>

    <input type="text" placeholder="Ingrese su nombre" 
      {...register('nombre', {
        required: {
          value: true,
          message: '*Campo obligatorio'
        }
      })}
      />
      { errors.nombre?.message && <p style={{color: 'red', fontSize:'14px', marginLeft:'5px'}}>{errors.nombre.message}</p>}
    <input type="text" placeholder="Ingrese SU domicilio" 
    {...register('direccion', {
        required: {
          value: true,
          message: '*Campo obligatorio'
        }
      })}
      />
      { errors.direccion?.message && <p style={{color: 'red', fontSize:'14px', marginLeft:'5px'}}>{errors.direccion.message}</p>}
    <select
      id='pagos'
      onChange={(e) => {setMp(e.target.value)}}      
    >
      <option value="">Medio de pago</option>
      <option value="Efectivo">Efectivo</option>
      <option value="Transferencia">Transferencia</option>
      <option value="Otros">Otros</option>
    </select>

    {
      mp === 'Transferencia' && ( 
      <>
      <button 
        type ="button" 
        className='btn-mp' 
        onClick={() => { handleCompartir('Alias')}}>Copiar alias</button>
      <button 
        type="button"
        className='btn-mp' 
        onClick={() => { handleCompartir('CVU/CBU')}}>Copiar CVU/CBU</button>
      </> 
      )
    }
      
    <button type="submit" className="btn-enviar">
      ENVIAR
    </button>
  </form>
</div>

  )
};
export default EnviarPedido;