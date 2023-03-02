
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Animal } from "../../models/Animal";
import { apiCall } from "../../services/fetchAnimals";
import "./animalBig.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function AnimalBig() {
  const { id } = useParams();

  const [animalList, setAnimalList] = useState<Animal[]>([])
  const [currentAnimal, setCurrentAnimal] = useState<Animal>();
  const [lastFed, setLastFed] = useState<Date>();

  useEffect(() => {
    const createAnimals = async () => {
      let response = await apiCall();
      let animalList = response.map((a) => {
        return new Animal (a.id, a.name, a.latinName, a.yearOfBirth, a.shortDescription, a.longDescription, a.imageUrl, a.isFed, a.lastFed);
      })
      localStorage.setItem("animalList",JSON.stringify(animalList));
      setAnimalList(animalList)
    } 
  
    const storedAnimals = localStorage.getItem("animalList");
    if (storedAnimals) {
      setAnimalList(JSON.parse(storedAnimals))
    }
    else {
      createAnimals()
    }
  }, []);  

  useEffect(() => {
    setCurrentAnimal(animalList[Number(id)]);

  }, [animalList]);
  useEffect(() => {
    setLastFed(currentAnimal?.lastFed);

  }, [currentAnimal]);

  useEffect(() => {

    if (currentAnimal) {
      let feedButton = document.getElementById("feedButton") as HTMLButtonElement
      const threeHours = 10800000;  
      let mydate = currentAnimal.lastFed;
      let processedDate = new Date(mydate);
      let feedingDate = processedDate.valueOf();

      let currentDate = new Date().valueOf();

  
       if (currentDate - feedingDate > threeHours) {
        feedButton.disabled = false;
        toast(currentAnimal.name +  " Är Hungrig!");
       }
       if (currentDate - feedingDate < threeHours) {
        feedButton.disabled = true;
       }
    }
   
       
  }, [currentAnimal])


  function handleClick() {
   let feedButton = document.getElementById("feedButton") as HTMLButtonElement
    if (currentAnimal) {
      currentAnimal.lastFed = new Date();
      setLastFed(currentAnimal?.lastFed);
       feedButton.disabled=true;
    }
     localStorage.setItem("animalList", JSON.stringify(animalList));
     
  }


  return ( 
    <div>
      {currentAnimal ?
      <section className="animalBigOuterContainer">
  <div className="animalBigLeftContainer">
      <img src={currentAnimal.imageUrl} alt="" />
      <h2>{currentAnimal.name}</h2>
      <p id="latin">{currentAnimal.latinName}</p>
      <p>Födelseår: {currentAnimal.yearOfBirth}</p>
      <p id="longDescription">{currentAnimal.longDescription}</p>
  </div>   

  <div className="animalBigRightContainer">
      <h4>{currentAnimal.name} Matades senast:</h4>
      <p>{JSON.stringify(lastFed)}</p>
      <button id="feedButton" onClick={handleClick}>Mata {currentAnimal.name}</button>
  </div>
  <ToastContainer autoClose={10000}></ToastContainer>
  </section>
  : <div>No animal with this id.</div>
    }
    </div>
  )
}