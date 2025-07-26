import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import './home.css';
import './Loader.css';
import BannerAddProducto from './BannerAddProducto';

const Home = ({
  productos,
  categorias,
  isLoading,
  setIsHome,
  setIsCarrito,
  addFavorito,
  setFavoritos,
  favoritos,
  productosSeleccionados,
  setProductosSeleccionados,
  handleCompartir,
  verProducto,
  setVerProducto,
  setIsVerProducto,
  agregarProductoAlCarrito,
  costoEnvio,
  checkProductoEnCarito,
  formatoPesos
}) => {
  const [categoriaActual, setCategoriaActual] = useState('Todo');

  // Cuando se cargan productos y la categoría es Todo
  useEffect(() => {
    if (categoriaActual === 'Todo') {
      setProductosSeleccionados(productos);
    }
  }, [productos, categoriaActual]);

  // Cuando cambian los favoritos y estás en Favoritos
  useEffect(() => {
    const filtro = []
    if (categoriaActual === 'Favoritos') {
      //Filtra si un producto fue desactivado del carrito
      favoritos.forEach(pro => {
        if(productos.some(item => item.id === pro.id)){
          filtro.push(pro)
        }        
      })
      setProductosSeleccionados(filtro);
    }
  }, [favoritos, categoriaActual]);

  const categoriaSelect = (cat) => {
    setCategoriaActual(cat);

    if (cat === 'Favoritos') {
      setProductosSeleccionados(favoritos);
    } else if (cat === 'Todo') {
      setProductosSeleccionados(productos);
    } else {
      const filtro = productos.filter(
        (p) => p.categoria.toLowerCase() === cat.toLowerCase()
      );
      setProductosSeleccionados(filtro);
    }
  };

  return (
    <div className="container-home">
      <section className="container-categorias">
        <button
          onClick={() => categoriaSelect('Todo')}
          className="container-cat btn"
        >
          <div className="container-img-cat">
            <img src="./img/todo.webp" alt="Imagen" />
          </div>
          <p className="name-categoria">Todo</p>
        </button>

        <button
          className="container-cat btn"
          onClick={() => categoriaSelect('Favoritos')}
        >
          <div className="container-img-cat">
            <img src="./img/favoritos.webp" alt="Imagen" />
          </div>
          <p className="name-categoria">Favoritos</p>
        </button>
        
        {categorias &&
          categorias.map((cat) => (
            <button className="container-cat btn" key={cat.id}>
              <div
                className="container-img-cat"
                onClick={() => categoriaSelect(cat.categoria)}
              >
                <img src={cat.urlImg} alt="Imagen" />
              </div>
              <p className="name-categoria">{cat.categoria}</p>
            </button>
          ))}
      </section>

      <section className="container-productos">
        {isLoading && <Loader />}

        { productosSeleccionados.length > 0 ? (
          productosSeleccionados.map((pro) => (
            pro.activate &&
            <div className="card-producto" 
              style={{ backgroundColor: checkProductoEnCarito(pro.id) ? '#d1ebd1' : '' }}
              key={pro.id}>
              <div className="img-container">
                <img src={pro.urlImg} alt={pro.titulo} />
                <button className="btn-compartir"
                  onClick={() => { handleCompartir(pro.id) }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    height="20px" 
                    viewBox="0 -960 960 960" width="24px" 
                    fill="#000000">
                    <path d="M664.43-120q-39.81 0-67.51-27.82-27.69-27.82-27.69-67.56 0-6 5.31-30.31L286.62-416.62q-12.93 15-31.72 23.5-18.8 8.5-40.28 8.5-39.43 0-67.02-28.07Q120-440.77 120-480q0-39.23 27.6-67.31 27.59-28.07 67.02-28.07 21.48 0 40.28 8.5 18.79 8.5 31.72 23.5l287.92-170.16q-2.77-7.77-4.04-15.42-1.27-7.66-1.27-15.66 0-39.74 27.87-67.56Q624.98-840 664.8-840q39.82 0 67.51 27.87Q760-784.25 760-744.43q0 39.81-27.82 67.51-27.82 27.69-67.56 27.69-21.7 0-40-8.89Q606.31-667 593.38-682L305.46-511.08q2.77 7.77 4.04 15.43 1.27 7.65 1.27 15.65t-1.27 15.65q-1.27 7.66-4.04 15.43L593.38-278q12.93-15 31.24-23.88 18.3-8.89 40-8.89 39.74 0 67.56 27.87Q760-255.02 760-215.2q0 39.82-27.87 67.51Q704.25-120 664.43-120Zm.19-40q23.53 0 39.46-15.92Q720-191.85 720-215.38q0-23.54-15.92-39.47-15.93-15.92-39.46-15.92-23.54 0-39.47 15.92-15.92 15.93-15.92 39.47 0 23.53 15.92 39.46Q641.08-160 664.62-160Zm-450-264.62q23.86 0 40-15.92 16.15-15.92 16.15-39.46t-16.15-39.46q-16.14-15.92-40-15.92-23.22 0-38.92 15.92Q160-503.54 160-480t15.7 39.46q15.7 15.92 38.92 15.92Zm450-264.61q23.53 0 39.46-15.92Q720-721.08 720-744.62q0-23.53-15.92-39.46Q688.15-800 664.62-800q-23.54 0-39.47 15.92-15.92 15.93-15.92 39.46 0 23.54 15.92 39.47 15.93 15.92 39.47 15.92Zm0 473.85ZM215.38-480Zm449.24-264.62Z"/>
                  </svg>
                </button>
              </div>
              <div className="info-container"
                onClick={() => { 
                  setVerProducto(() => {
                    return productos.find(p => p.id === pro.id);                
                  });
                  setIsVerProducto(true)
                }}
              >
                <p className="titulo">{pro.titulo}</p>
                <p className="descripcion">{pro.descripcion}</p>
                
                {
                pro.oferta ? 
                <div className="info-precios">
            <span 
             className="precio-off"
              style={
                {display:'flex',
                 gap:'10px'}
                 }>
                <p 
                  style={
                    {color:'grey',
                     textDecoration:'line-through',
                    }}>
                      {formatoPesos(Number(pro.precioUnitario))}
                </p>
                <p style={
                  {color: 'red',
                   fontSize:'13px'
                  }
                   }>
                    {Number(pro.porcentajeOff)}
                    % OFF
                </p>
                 { pro.precio && pro.porcentajeOff && (
                <p style={{fontSize:'16px', fontWeight:'600'}}>
                   {formatoPesos(Number(pro.precio))}
                </p>
                 )}
            </span>

           
          </div>
            :
            <div className="info-precios">
            <p style={{fontSize:'16px', fontWeight:'600'}}>{formatoPesos(Number(pro.precio))}</p>
            </div>
          }
              </div>
              <div className="nav-btn">
                {/* Boton para agregar el producto al carrito */}
                { 
                  checkProductoEnCarito(pro.id) ? 
                  <button 
                    className="btn-nav-productos" 
                    type="button"
                    onClick={() => {agregarProductoAlCarrito(pro.id) }}
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
                    onClick={() => {agregarProductoAlCarrito(pro.id) }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      height="24px" 
                      viewBox="0 -960 960 960" 
                      width="24px" 
                      fill="#000000">
                        <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z"/>
                    </svg>
                  </button>
                }
                
                { /*  Boton para agregar o sacar un producto de favoritos */}
                <button
                  className="btn-nav-productos"
                  type="button"
                  onClick={() => addFavorito(pro.id)}
                >
                  {favoritos.find((f) => f.id === pro.id) ? (
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
              </div>
            </div>
          ))
        ) : (
          <h4 style={{ color: 'grey', textAlign: 'center' }}>
            No hay productos para mostrar
          </h4>
        )}
      </section>
    </div>
  );
};

export default Home;