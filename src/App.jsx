import React,{ useState, useEffect, useRef} from 'react';
import { getData, getDataCategorias, getEnvio } from './firebase/auth.js'
import './App.css'

import InstallPrompt from './Components/InstallPrompt.jsx';
import Home from './Components/Home.jsx';
import Carrito from './Components/Carrito.jsx';
import VerProducto from './Components/VerProducto.jsx';
import SharedConfirm from './Components/SharedConfirm.jsx';
import BannerAddProducto from './Components/BannerAddProducto.jsx';
import BannerProductoAgregado from './Components/BannerProductoAgregado.jsx'
import Menu from './Components/Menu.jsx';
import LinkCopiado from './LinkCopiado.jsx';
import EnviarPedido from './Components/EnviarPedido.jsx';
import MisPedidos from './Components/MisPedidos.jsx';
import VerQr from './Components/VerQr.jsx';
import ConfirmReturnProduct from './Components/ConfirmReturnProduct.jsx';

function App() {

  const favoritosLocal = localStorage.getItem('e-shop-favoritos');
  const productosCarritoLocal = localStorage.getItem('e-shop-carrito')
  const misPedidos = localStorage.getItem('mispedidos')
  const [ verProducto, setVerProducto ] = useState([])  

  const [ productos, setProductos ] = useState([]);
  const [ categorias, setCategorias ] = useState([])
  const [ costoEnvio, setCostoEnvio ] = useState(0)
  const [ favoritos, setFavoritos ] = useState(favoritosLocal ? JSON.parse(favoritosLocal) : [] )
  const [ productosSeleccionados, setProductosSeleccionados] = useState([])
  const [ productosEnCarrito, setProductosEnCarrito ] = useState(productosCarritoLocal ? JSON.parse(productosCarritoLocal) : [] )
  const [ cantTotal, setCantTotal ] = useState(0);
  const [ misPedidosGuardados, setMisPedidosGuardados] = useState(misPedidos ? JSON.parse(misPedidos): [] )

  const [ isLoading, setIsLoading ] = useState(true);
  const [ isHome, setIsHome ] = useState(true);
  const [ isCarrito, setIsCarrito ] = useState(false);
  const [ isVerProducto, setIsVerProducto ] = useState(false);
  const [ isSharedConfirm, setIsSharedConfirm ] = useState(false);
  const [ isMisPedidos, setIsMisPedidos ] = useState(false);
  const [ onClose, setOnClose] = useState(false);
  const [ onRepetido, setOnRepetido ] = useState(false);
  const [ openMenu, setOpenMenu] = useState(false);
  const [ sharedLink, setSharedLink ] = useState(false);
  const [ onEnviarPedido, setOnEnviarPedido ] = useState(false);
  const [ onQr, setOnQr ] = useState(false)
  const [ isReturnPedido, setIsReturnPedido ] = useState(false);

  const [ textoCompartir, setTextoCompartir ] = useState(null)
 
  const [ on, setOn ] = useState(false)

  const miRefScroll = useRef(null);

  // copia al portapapeles la url
   const sharedApp = () => {
    navigator.clipboard.writeText('https://s-shop-eight.vercel.app/') 
    .then(() => {
      setSharedLink(true)
      setTimeout(() => {
       setSharedLink(false)
      }, 3000);
    })
    .catch(()=> {
      console.log('Error al compiar el link al portapapeles')
    })
  }

// Muestra un producto si llega en la url
useEffect(() => {
  const path = window.location.pathname;
  const id = path.slice(1);  
  if (!id || productos.length === 0) return;
  const filter = productos.find(p => p.id === id);
  if (filter) {
    setVerProducto(filter);
    setIsVerProducto(true)
  }
}, [productos]); //  cuando se cargan los productos, se ejecuta

// Carga los datos a los estados correspondientes
  useEffect(() => {    
  const unsubscribeProductos = getData(setProductos);
  const unsubscribeCategorias = getDataCategorias(setCategorias);
  const unsubscribeEnvio = getEnvio(setCostoEnvio);
    
  return () => {
    if (unsubscribeProductos) unsubscribeProductos();
    if (unsubscribeCategorias) unsubscribeCategorias();
    if (unsubscribeEnvio ) unsubscribeEnvio();
  };
}, []);

useEffect(() => {
  if (productos.length > 1 && categorias.length > 1) {
    setIsLoading(false);

    if (productosEnCarrito.length > 0) {
      const filtro = productosEnCarrito.filter(pro =>
        productos.some(item => item.id === pro.id)
      );

      const esIgual = JSON.stringify(filtro) === JSON.stringify(productosEnCarrito);
      if (!esIgual) {
        setProductosEnCarrito(filtro);
      }
    }
  }
}, [productos, categorias]);

  const formatoPesos = (importe) => {
    
    return importe.toLocaleString('es-AR', { 
      style:'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    })
  }

  const manejarScrollArriba = () => {
    miRefScroll.current?.scrollIntoView({behavior:'smooth'})
  }

  const addFavorito = (e) => {
    const checkFavorito = favoritos.find(check => check.id === e);
    if (!checkFavorito) {
      const filter = productos.find(fav => fav.id === e)
      setFavoritos([...favoritos, filter]);
    }else {
      // si ya esta el producto en favoritos lo elimina
      const filterCopy = favoritos.filter(fav => fav.id !== e)
      setFavoritos(filterCopy)
    }
  }

  useEffect(() => {
    localStorage.setItem('e-shop-favoritos',JSON.stringify(favoritos));
  },[favoritos])

  useEffect(() => {
    localStorage.setItem('e-shop-carrito', JSON.stringify(productosEnCarrito))
  },[productosEnCarrito])

  useEffect(() => {
    localStorage.setItem('mispedidos', JSON.stringify(misPedidosGuardados))
  },[misPedidosGuardados])

  useEffect(() => {
  const totalProductos = productosEnCarrito.reduce((acc, current) => Number(acc) + Number(current.cant), 0);
  setCantTotal(totalProductos);
}, [productosEnCarrito]);

  //Compartir id del producto en la url
  const handleCompartir = (producto) => {
    const url = `${window.location.origin}/${producto}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setTextoCompartir('Link')
        setIsSharedConfirm(true)
        setTimeout(() => {
       setIsSharedConfirm(false)
      }, 3000);
      })
      .catch(() => alert("No se pudo copiar"));
  };
  
  const agregarProductoAlCarrito = (id) => {
    const isProductInCart = productosEnCarrito.some(pro => pro.id === id);
    if(isProductInCart){
      setOnRepetido(true);
    }else{
      const filter = productos.find(pro => pro.id === id);
    //console.log('filter: ', filter);
    setProductosEnCarrito([...productosEnCarrito, {...filter, cant:1}])
    setOnClose(true)
    }    
  }
  // ve si el producto ya esta en el carrito asi pinta el boton +
  const checkProductoEnCarito = (id) => {
    return productosEnCarrito.some(pro => pro.id === id);    
  }

  // Enviar mensaje por whatsApp
  const handleEnviarWhatsApp = () => {  
  //const mensaje = crearMensajeWhatsApp(carrito, nombre, direccion, telefono);
  const mensaje = 'Hola, quiero hacer una consulta desde e-shop!'
  const numeroVendedor = "541134025499"; // con código país, sin +
  const url = `https://wa.me/${numeroVendedor}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
};

  return (
    <div className="container-app">
      { isReturnPedido &&<ConfirmReturnProduct /> }
      {
        onQr && 
        <VerQr 
        setOnQr={setOnQr}
        />
      }

      { onEnviarPedido &&
        <EnviarPedido 
        productosEnCarrito={productosEnCarrito}
        setOnEnviarPedido={setOnEnviarPedido}
        setProductosEnCarrito={setProductosEnCarrito}
        costoEnvio={costoEnvio}
        setIsHome={setIsHome}
        setIsCarrito={setIsCarrito}
        setMisPedidosGuardados={setMisPedidosGuardados}
        misPedidosGuardados={misPedidosGuardados}
        />
      }
      { 
        sharedLink && 
          <LinkCopiado />
      }
      { openMenu && <Menu 
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        sharedApp={sharedApp}
        setIsMisPedidos={setIsMisPedidos}
        setIsHome={setIsHome}
        isHome={isHome}
        isCarrito={isCarrito}
        setIsCarrito={setIsCarrito}
        setIsSharedConfirm={setIsSharedConfirm}
        setTextoCompartir={setTextoCompartir}
        setOnQr={setOnQr}
      /> 
      }
      { onRepetido &&
        <BannerProductoAgregado 
          setOnRepetido={setOnRepetido}
        />
      }
      { onClose && <BannerAddProducto 
                      setOnClose={setOnClose}
                    />
                    }
      { isSharedConfirm &&
         <SharedConfirm 
          texto={textoCompartir}
         />  }
      <InstallPrompt /> { /* Pregunta para instalar la app*/}
      {
        isVerProducto &&
          <VerProducto 
            verProducto={verProducto}
            setIsVerProducto={setIsVerProducto}
            favoritos={favoritos}
            addFavorito={addFavorito}
            agregarProductoAlCarrito={agregarProductoAlCarrito}
            checkProductoEnCarito={checkProductoEnCarito}
            formatoPesos={formatoPesos}
          />
      }
      <header ref={miRefScroll}>
        <img src="./logo.png" alt="Imagen logo " />Mis tres Princesas
      <div className="btn-menu-header"
          onClick={() => { setOpenMenu(!openMenu)}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
          height="24px" 
          viewBox="0 -960 960 960"
          width="24px" 
          fill="#000000"><path d="M160-269.23v-40h640v40H160ZM160-460v-40h640v40H160Zm0-190.77v-40h640v40H160Z"/>
          </svg>
        </div>
      </header>

      <nav className="nav">        
        {/* Boton Home*/}
        {
          isHome ? 
            <button 
            className="btn btn-menu"
            onClick={() => { 
            setIsCarrito(false);
            setIsHome(true);
            setIsMisPedidos(false);
            }}
          >
            < img src="./img/shopOn.webp" alt="Icono shop" />
          </button>
          : 
          <button 
            className="btn btn-menu"
            onClick={() => { 
            setIsCarrito(false);
            setIsHome(true);
            setIsMisPedidos(false);
            }}
          >
            < img src="./img/shopOff.webp" alt="Icono shop" />
          </button>
        }
        {/* Boton Carrito*/}
        <div className="btn-carrito-cant">
       {
          isCarrito ? 
            <button 
            type='button'
            className="btn btn-menu"
            onClick={() => { 
            setIsCarrito(false);
            setIsHome(true);
            setIsMisPedidos(false);
            }}
          >
            < img src="./img/carritoOn.webp" alt="Icono shop" />
            <p>{cantTotal}</p>
          </button>
          : 
          <button 
          type='button'
            className="btn btn-menu"
            onClick={() => { 
            setIsCarrito(true);
            setIsHome(false);
            setIsMisPedidos(false);
            }}
          >
            < img src="./img/carritoOf.webp" alt="Icono shop" />
            <p>{cantTotal}</p>
          </button>
        }
        </div>
          
      </nav>
       <main>
        {
          isMisPedidos && 
            <MisPedidos 
              misPedidosGuardados={misPedidosGuardados}
              setMisPedidosGuardados={setMisPedidosGuardados}
              formatoPesos={formatoPesos}
              productos={productos}
              setProductosEnCarrito={setProductosEnCarrito}
              productosEnCarrito={productosEnCarrito}
              setIsReturnPedido={setIsReturnPedido}
            />
        }
        {
        isHome && 
          <Home 
          productos={productos}
          categorias={categorias}
          isLoading={isLoading}
          setIsHome={setIsHome}
          setIsCarrito={setIsCarrito}
          addFavorito={addFavorito}
          setFavoritos={setFavoritos}
          favoritos={favoritos}
          productosSeleccionados={productosSeleccionados}
          setProductosSeleccionados={setProductosSeleccionados}
          handleCompartir={handleCompartir}
          verProducto={verProducto}
          setVerProducto={setVerProducto}
          setIsVerProducto={setIsVerProducto}
          agregarProductoAlCarrito={agregarProductoAlCarrito}
          costoEnvio={costoEnvio}
          checkProductoEnCarito={checkProductoEnCarito}
          formatoPesos={formatoPesos}
      />
      }
      {
        isCarrito &&
          <Carrito 
          setIsHome={setIsHome}
          setIsCarrito={setIsCarrito}
          productosEnCarrito={productosEnCarrito}
          setProductosEnCarrito={setProductosEnCarrito}
          costoEnvio={costoEnvio}
          cantTotal={cantTotal}
          setCantTotal={setCantTotal}
          setOnEnviarPedido={setOnEnviarPedido}
          formatoPesos={formatoPesos}
          />
      }
       </main>  
      
      <footer>
        <section className="footer-info">
          <p>Mis Tres Princesas</p>
          <p>America 617</p>
          <p>1134025499</p>
          <p>Lunes a Lunes 8 a 22h</p>
        </section>
        <section className="footer-programador-info">
          <div>
          <p>Dino Studio</p>
          <p>Web Development</p>
          </div>
          <img src="./img/dino.png" alt="Logo programador" />
        </section>
        </footer>
      <button className="btn-flecha-arriba" onClick={manejarScrollArriba}>
        <svg xmlns="http://www.w3.org/2000/svg" 
        height="40px" 
        viewBox="0 -960 960 960" 
        width="40px" 
        fill="white">
          <path d="M446.67-160v-513l-240 240L160-480l320-320 320 320-46.67 47-240-240v513h-66.66Z"/>
        </svg>
      </button>
      <button 
        onClick={handleEnviarWhatsApp}
        className="btn-whatsapp"
      >
        <img src="./img/whatsapplogo.webp" alt='logo' />
      </button>
    </div>
  )
}

export default App
