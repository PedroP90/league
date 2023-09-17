import { IRoles } from "./config/interface/IRoles";
import roles from './config/data/roles.json'
import React from 'react'
import { nanoid } from 'nanoid'
import { firebaseConfig } from './config/firebaseConfig'
import { useFirestore } from 'reactfire'
import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, getDocs,
    addDoc, doc, getDoc, query, where, setDoc, deleteDoc,
} from 'firebase/firestore'

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();


//Cargar skins
export const cargarroles = async () => {
    try{
        console.log ('carga de datos...');
        roles.map ( async (rol) => {
            console.log(rol.name)
            const docRef = doc(db, "Roles", nanoid(20));
            await setDoc(docRef, rol)
        })
    }catch(error) {
        console.log(error)
    }
}

export const getRoles = async ():Promise<IRoles[]> => {
    let roles: IRoles[] = [];
    const rolesRef = collection(getFirestore(), "Roles");
    const RolesDocs = await getDocs(rolesRef);
    RolesDocs.forEach( doc => {
      const rol = { ...doc.data() }
      roles.push(rol as IRoles)
    });
    console.log(roles);
    return roles
  }