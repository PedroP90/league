import { IPosiciones } from "./config/interface/IPosiciones";
import posiciones from './config/data/posiciones.json'
import { nanoid } from 'nanoid'
import { firebaseConfig } from './config/firebaseConfig'
import { initializeApp } from 'firebase/app'
import { 
    getFirestore, doc, setDoc, collection, getDocs
} from 'firebase/firestore'

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();


//Cargar 
export const cargarposis = async () => {
    try{
        console.log ('carga de datos...');
        posiciones.map ( async (posicion) => {
            console.log(posicion.name)
            const docRef = doc(db, "Posiciones", nanoid(20));
            await setDoc(docRef, posicion)
        })
    }catch(error) {
        console.log(error)
    }
}
//Exportar datos
export const getPosiciones = async ():Promise<IPosiciones[]> => {
    let posiciones: IPosiciones[] = [];
    const posicionesRef = collection(getFirestore(), "Posiciones");
    const PosicionesDocs = await getDocs(posicionesRef);
    PosicionesDocs.forEach( doc => {
      const pos = { ...doc.data() }
      posiciones.push(pos as IPosiciones)
    });
    console.log(posiciones);
    return posiciones
  }