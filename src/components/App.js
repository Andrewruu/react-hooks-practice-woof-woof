import React, {useState, useEffect} from "react";
import DogDetails from "./DogDetails"
import SelectDog from "./SelectDog";
import Filter from "./Filter";


function App() {
  const [dogs, setDogs] = useState([]);
  const [selectedDogId, setSelectedDogId] = useState(null);
  const [goodDogsOnly, setGoodDogsOnly] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/pups")
      .then(res => res.json())
      .then(setDogs);
  }, []);

  function updateDog(updatedDog){
    const updatedDogs = dogs.map((dog)=> dog.id=== updatedDog.id ? updatedDog: dog)
    setDogs(updatedDogs)
  }
  const selectedDog = dogs.find((dog) => dog.id === selectedDogId)
  
  let displayDogs = dogs
  
  if (goodDogsOnly) {
    displayDogs = displayDogs.filter((dog) => dog.isGoodDog)
  }
  function handleToggleFilter() {
    setGoodDogsOnly((goodDogsOnly) => !goodDogsOnly);
  }

  return (
    <div className="App">
      <Filter goodDogsOnly={goodDogsOnly} onFilterClick={handleToggleFilter} />
      <SelectDog dogs={displayDogs} onClickDog={setSelectedDogId} />
      <DogDetails dog={selectedDog} updateDog={updateDog}/>
    </div>
  );
}

export default App;
