import React from "react";

function DogDetails({dog, updateDog}){
    if (!dog) return <h2>Select a dog</h2>

    const { id, name, image, isGoodDog} = dog
    function handleClick() {
        fetch(`http://localhost:3001/pups/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isGoodDog: !isGoodDog,
          }),
        })
          .then((res) => res.json())
          .then(updateDog);
      }
    return (
        <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <img src={image} alt={name} />
          <h2>{name}</h2>
          <button onClick={handleClick}>{isGoodDog ? "Good" : "Bad"} Dog!</button>
        </div>
      </div>
    )
}

export default DogDetails