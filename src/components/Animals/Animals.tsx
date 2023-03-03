import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Animal } from "../../models/Animal";
import { apiCall} from "../../services/fetchAnimals"
import './animals.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function Animals() {

  const [animalList, setAnimalList] = useState<Animal[]>([])



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
  
  }, [])



 function notification() {
    for (let i = 0; i < animalList.length; i++) {
      const threeHours = 10800000;
      let mydate = animalList[i].lastFed;
      let processedDate = new Date(mydate);
      let feedingDate = processedDate.valueOf();
      let currentDate = new Date().valueOf();

      
       if (currentDate - feedingDate > threeHours) {

        toast(animalList[i].name +  " Är Hungrig!");
       
       }

    }
  }

  useEffect(() => {
    notification()
  }, [animalList])


let html =  animalList.map((a, i) => {
  let currentId = a.id - 1;
  return  (<div className="animalContainer" key={i}>
      <img src={a.imageUrl} alt="Picture of animal" />
     
     <div className="animalSmallTextContent"> <div id="nameContainer"> <p>{a.name}</p> <p className="latin">{a.latinName}</p></div> 
      <p id="smallDescription">{a.shortDescription}</p>
      <Link to={"animal/" + currentId}><button>Läs mer</button></Link>
      </div>
      
  </div>)
})

return ( <section className="startpageContainer">
<h1>Our Zoo Animals</h1>
<div className="animalPageContainer">{html}</div>
<ToastContainer autoClose={12000}></ToastContainer>
</section> )
}
