import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isPropertySignature } from "typescript";
import { Animal } from "../../models/Animal";
import { IAnimalsProps } from "../../models/IAnimalsProps";
import { apiCall, checkStorage, getLocalStorage, updateStorage } from "../../services/fetchAnimals";
import "./animalBig.scss"

export function AnimalBig() {
    const { id } = useParams();

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
      
    console.log(animalList);
    let currentAnimal = animalList[Number(id)];

    console.log(currentAnimal);

  

    function handleClick() {
        currentAnimal.lastFed = JSON.stringify(new Date());
        // localStorage.clear()
        // localStorage.setItem("animalList", JSON.stringify(animalList));
    }

    return ( 
    <section className="animalBigOuterContainer">
    <div className="animalBigLeftContainer">
        <img src={currentAnimal.imageUrl} alt="" />
        <h2>{currentAnimal.name}</h2>
        <p id="latin">{currentAnimal.latinName}</p>
        <p>Födelseår: {currentAnimal.yearOfBirth}</p>
        <p id="longDescription">{currentAnimal.longDescription}</p>
    </div>   

    <div className="animalBigRightContainer">
        <h2>{}</h2>
        <button onClick={handleClick}>Feed Animal</button>
    </div>
    </section>
    )
}