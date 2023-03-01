import React, { useEffect, useState } from 'react';
import './App.scss';
import { Animals } from './components/Animals/Animals';
import { Animal } from './models/Animal';
import { apiCall, checkStorage, createAnimals, setStartStorage } from './services/fetchAnimals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimalBig } from './components/AnimalBig/AnimalBig';



function App() {
//   const [storageStatus, setStorageStatus] = useState(false)

//   function startShit() {

//     if (localStorage.getItem("animalList") === null) {
//     const createAnimals = async () => {
//       let response = await apiCall();
//       let animalList = response.map((a) => {
//       return new Animal (a.id, a.name, a.latinName, a.yearOfBirth, a.shortDescription, a.longDescription, a.imageUrl, a.isFed, a.lastFed);
//       })
//       localStorage.setItem("animalList",JSON.stringify(animalList))
//       setAnimalList(animalList)
//   } 
//   createAnimals();  
// }
//   if (localStorage.getItem("animalList")) {

//   }
// }
//   useEffect(() => {startShit()},[])


// const [animalList, setAnimalList] = useState<Animal[]>([])

// useEffect(() => {
//        const createAnimals = async () => {
//       let response = await apiCall();
//       let animalList = response.map((a) => {
//       return new Animal (a.id, a.name, a.latinName, a.yearOfBirth, a.shortDescription, a.longDescription, a.imageUrl, a.isFed, a.lastFed);
//       })
//       localStorage.setItem("animalList",JSON.stringify(animalList));
//       setAnimalList(animalList)
//   } 

//   const storedAnimals = localStorage.getItem("animalList");
//   if (storedAnimals) {
//     setAnimalList(JSON.parse(storedAnimals))
//   }
//   else {
//     createAnimals()
//   }

// }, [])


  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Animals></Animals>}></Route>
  <Route path="/animal/:id" element={<AnimalBig></AnimalBig>}></Route>
  </Routes>
    </BrowserRouter>
    
  );
}


export default App