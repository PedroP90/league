import { IChampion } from './config/interface/IChampions'
import champions from './config/data/champions.json'
import { nanoid } from 'nanoid'
import { firebaseConfig } from './config/firebaseConfig'
import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, getDocs, doc, setDoc, deleteDoc} from 'firebase/firestore'


export const app = initializeApp(firebaseConfig);
export const db = getFirestore();


//carga masiva de datos antigua
// export const cargar = async ( ) => {
//     try{
//         console.log('carga de datos...');
//         champions.map(async (champion) => {
//             const codigo = nanoid(20);
//             const docRef = doc(db, "Campeones", codigo);
//             await setDoc(docRef, { codigo: codigo, ...champion });
//             window.location.reload();
//         })
//     }catch(error) {
//         console.log(error)
//     }
// }

//carga masiva de datos
export const cargar = async ( ) => {
  try{
      console.log('carga de datos...');
      for (const champion of champions) {
          const codigo = nanoid(20);
          const docRef = doc(db, "Campeones", codigo);
          await setDoc(docRef, champion);
      }
      window.location.reload();
  }catch(error) {
      console.log(error)
  }
}

//añadir un nuevo campeón
export const AddChampion = async (data: IChampion) => {
    try{
        const nuevoDato = { codigo: nanoid(20), ...data };
        const championRef = doc(db, "Campeones", nuevoDato.codigo);
        await setDoc(championRef, nuevoDato);  
    }catch(error) {
        console.log(error)
    }
}

//importar los datos
export const getChampions = async ():Promise<IChampion[]> => {
    let champions: IChampion[] = [];
    const championsRef = collection(getFirestore(), "Campeones");
    const ChampionsDocs = await getDocs(championsRef);
    ChampionsDocs.forEach( doc => {
      const champion = { ...doc.data() }
      champions.push(champion as IChampion)
    });
          
    console.log(champions);
    return champions
  }

  // Eliminar un campeón
export const deleteChampion = async (codigo: string) => {
    try {
      const championsRef = doc(db, "Campeones", codigo);
      await deleteDoc(championsRef);
      console.log("Campeón eliminado correctamente");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };