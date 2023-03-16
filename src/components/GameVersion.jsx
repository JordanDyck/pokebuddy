import Select from "react-select"
import axios from "axios"
import {useState, useEffect, useCallback} from "react"
import {useDispatch} from "react-redux"

import {setSearch} from "../store/slices/searchSlice"

const options = [
  {value: 1, label: "Gen 1 (#1-151)"},
  {value: 2, label: "Gen 2 (#152-251)"},
  {value: 3, label: "Gen 3 (#252-386)"},
  {value: 4, label: "Gen 4 (#387-493)"},
  {value: 5, label: "Gen 5 (#494-649)"},
  {value: 6, label: "Gen 6 (#650-721)"},
  {value: 7, label: "Gen 7 (#722-809)"},
  {value: 8, label: "Gen 8 (#810-905)"},
  {value: 9, label: "Gen 9 (#906-1008)"},
]

const GameVersion = ({setPokemonList, pokemonList}) => {
  //sets the current generation *don't use this for anything else*
  const [generation, setGeneration] = useState(options[0])
  // the data from api.
  const [genData, setGenData] = useState([])

  const dispatch = useDispatch()

  //fetches the generation & name of pokemon.
  useEffect(() => {
    if (genData?.id !== generation.value) {
      axios
        .get(`https://pokeapi.co/api/v2/generation/${generation.value}`)
        .then((res) => {
          const newGenData = res.data.pokemon_species.map((p) => ({
            name: p.name,
            id: p.url.split("species/")[1].replace("/", ""),
          }))
          const sortedGenData = [...newGenData].sort((a, b) => a.id - b.id)
          setGenData(sortedGenData.map((p) => p.name))
          // creates a list of all pokemon names in current gen
          setPokemonList(
            sortedGenData.map((pokemon) => ({
              value: parseInt(pokemon.id),
              label: `${pokemon.name} #${pokemon.id}`,
            }))
          )
        })
    }
  }, [generation, genData.id, setPokemonList])

  // displays the dropdown list of pokemon based on selected gen.
  const handleChoice = useCallback(
    (selectedOption) => {
      setGeneration(selectedOption)
      console.log("render 2")
    },
    [setGeneration]
  )
  // sets the first pokemon in selected gen as current pokemon.
  useEffect(() => {
    dispatch(setSearch(pokemonList[0]))
  }, [handleChoice, dispatch, pokemonList])

  return (
    <div>
      <Select
        className="select-version"
        options={options}
        value={generation}
        onChange={handleChoice}
        styles={{
          option: (base) => ({
            ...base,
            border: "1px solid #a9a9a9",
          }),
        }}
      />
    </div>
  )
}
export default GameVersion
