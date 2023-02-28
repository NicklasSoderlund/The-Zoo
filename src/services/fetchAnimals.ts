import axios from "axios";
import { Animal } from "../models/Animal";
import { IApiResponse } from "../models/IApiResponse";

async function apiCall() {
   let response = await axios.get("https://animals.azurewebsites.net/api/animals")
   return response.data as IApiResponse[]
  }

 async function createAnimalList() {
   let animals = await apiCall();
   let animalList = animals.map((a) => {
       new Animal (a.id, a.name, a.latinName, a.yearOfBirth, a.shortDescription, a.longDescription, a.imageUrl, a.isFed, a.lastFed)
   })
  }

export function fetchAnimals() {

 
    
}