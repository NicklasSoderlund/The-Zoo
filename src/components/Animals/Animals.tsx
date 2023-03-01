import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../../models/Animal";
 import { IAnimalsProps } from "../../models/IAnimalsProps";
import { apiCall} from "../../services/fetchAnimals"
import './animals.scss';

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

  console.log(animalList);

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

return ( <div className="animalPageContainer">{html}</div> )
}
