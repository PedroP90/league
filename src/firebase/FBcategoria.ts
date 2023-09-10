import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import ICategoria from "./config/interface/ICategoria";
import { useFirestore } from "reactfire";
import { firebaseConfig } from "./config/firebaseConfig";
import { nanoid } from "nanoid";


export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

//try/catch: estructura usada para que cualquier error que ocurra al pedir datos no se vea en la página/app
//nanoid es para poner una id random

// export const cargar = async () => {

//   libros.map( async (libro:Ilibro) => {
//     await newLibro(libro);
//   })
// }

export const addCategoria = async (data:ICategoria) => {
  try{
    console.log('Insertando en FB el objeto: ',data )
    //const newData = { codigo: nanoid(20), ...data}
    const nuevoDato = { codigo: nanoid(20), ...data };
    const categoriasRef = doc(db, "Categorias", nuevoDato.codigo);
    await setDoc(categoriasRef, nuevoDato);

  }catch(error) {
    console.log(error)
  }
}
//Todas las funciones en cuyo cuerpo haya que esperar, agregar un await, debe ser encabezada con un async
//Todas las funciones de conexión a la base de datos

export const getCategorias = async ():Promise<ICategoria[]> => {
  let categorias: ICategoria[] = [];
  const categoriasRef = collection(getFirestore(), "Categorias");
  const CategoriasDocs = await getDocs(categoriasRef);
  CategoriasDocs.forEach( doc => {
    //console.log(doc.data());
    const categoria = { ...doc.data() }
    //console.log(categoria);
    categorias.push(categoria as ICategoria)
  });
        // categorias = [{name: 'pepe'}]
  console.log(categorias);
  return categorias
}