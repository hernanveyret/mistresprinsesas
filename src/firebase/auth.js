import { auth, db } from './config.js'
import { collection,
         onSnapshot, 
         doc,
         query, 
         where
        } from "firebase/firestore";

// Escuchar cambios en tiempo real y descargarlos


export const getData = (callback) => {
  try {
    const productosRef = collection(db, 'productos');

    // 🔍 Filtrar solo productos activos
    const q = query(productosRef, where('activate', '==', true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        precio: doc.data().precioUnitario - (doc.data().precioUnitario * doc.data().porcentajeOff / 100),
        total: doc.data().precioUnitario - (doc.data().precioUnitario * doc.data().porcentajeOff / 100)
      }));

      callback(productos);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    callback([]);
  }
};


//Escuchar en tiempo real y ver las categorias
export const getDataCategorias = (callback) => {
  try {
    const unsubscribe = onSnapshot(collection(db,'categorias'), snapshot => {
      const usuarios = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    callback(usuarios);
    //console.log(usuarios)
  })
  return unsubscribe;
  } catch (error) {
    callback([]);
  }
};

export const getEnvio = (callback) => {
  try {
    const envioRef = doc(db, 'envio', 'precio');
    
    const unsubscribe = onSnapshot(envioRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() });
      } else {
        callback(null); // o {} si preferís
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error("⛔ Error al obtener el precio de envío:", error);
    callback(null);
  }
};
