import axios from "axios";
import { useEffect, useState } from "react";
import { Animal } from "../models/Animal";
import { IApiResponse } from "../models/IApiResponse";

export async function apiCall() {
   let response = await axios.get("https://animals.azurewebsites.net/api/animals")
   return response.data as IApiResponse[]
  }

 export async function createAnimals() {
    let response = await apiCall();
    let animalList = response.map((a) => {
return new Animal (a.id, a.name, a.latinName, a.yearOfBirth, a.shortDescription, a.longDescription, a.imageUrl, a.isFed, a.lastFed);
})
return animalList
 }

 export function checkStorage() {
    if ( localStorage.getItem("animalList") !== null || []  ) {
      let animalList:Animal[] = (JSON.parse(localStorage.getItem("animalList") as string))
      return animalList
      }
  }

export function updateStorage(list:Animal[]) {
  console.log(list);
  localStorage.setItem("animalList", JSON.stringify(list));
  console.log(localStorage.getItem("animalList") as string)
}


// export const useLocalStorage = (name: string): Function[] => {
//   const getLocalStorage = () => {
//       const local = localStorage.getItem(name)
//       if(local != null){
//           return JSON.parse(local)
//       }
//       return null
//    }
//   const setLocalStorage = (item: Object) => {
//      localStorage.setItem(name, JSON.stringify(item))
//   }
//   const removeLocalStorage = () => {
//       return localStorage.removeItem(name)
//   }
//   return [getLocalStorage, setLocalStorage, removeLocalStorage]
// }

export function getLocalStorage(name:string) {
  const local = localStorage.getItem(name)
  if(local != null){
      return JSON.parse(local) as Animal[]
  }
}

export function setLocalStorage(name:string, list:Animal[]) {
  localStorage.setItem(name, JSON.stringify(list))

}


export function setStartStorage() {
  if (localStorage.getItem("animalList") === null) {
        const createAnimals = async () => {
          let response = await apiCall();
          let animalList = response.map((a) => {
          return new Animal (a.id, a.name, a.latinName, a.yearOfBirth, a.shortDescription, a.longDescription, a.imageUrl, a.isFed, a.lastFed);
          })
          localStorage.setItem("animalList",JSON.stringify(animalList))
          return animalList
    } 
createAnimals();  
  }
  }