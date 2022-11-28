import Select from "react-select"
import axios from "axios"
import { useState, useEffect } from "react"

const options = [
  { value: 1, label: "Gen 1" },
  { value: 2, label: "Gen 2" },
  { value: 3, label: "Gen 3" },
  { value: 4, label: "Gen 4" },
  { value: 5, label: "Gen 5" },
  { value: 6, label: "Gen 6" },
  { value: 7, label: "Gen 7" },
  { value: 8, label: "Gen 8" },
]

const GameVersion = ({ setPokemonList }) => {
  //sets the current generation *don't use this for anything else*
  const [generation, setGeneration] = useState(options[0])

  // the data from api.
  const [genData, setGenData] = useState([])

  //fetches the generation & name of pokemon.
  useEffect(() => {
    if (genData?.id !== generation.value) {
      axios
        .get(`https://pokeapi.co/api/v2/generation/${generation.value}`)
        .then((res) => {
          const newGenData = res.data.pokemon_species.map((p) => p.name)
          setGenData(newGenData)
          // creates a list of all pokemon names in current gen
          setPokemonList(
            newGenData.map((pokemon) => ({ value: pokemon, label: pokemon }))
          )
        })
    }
  }, [generation])

  const handleChoice = (selectedOption) => {
    setGeneration(selectedOption)
  }
  return (
    <div>
      <Select
        className="select-version"
        options={options}
        value={generation}
        onChange={handleChoice}
      />
    </div>
  )
}
export default GameVersion
