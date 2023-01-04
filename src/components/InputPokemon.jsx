import {useState} from "react"
import Select, {createFilter} from "react-select"
import {useSelector, useDispatch} from "react-redux"

import {setSearch} from "../store/slices/searchSlice"
import GameVersion from "./GameVersion"
import PokeTypes from "./PokeTypes"

const InputPokemon = () => {
  const [pokemonList, setPokemonList] = useState([])

  const search = useSelector((store) => store.search.value)
  const dispatch = useDispatch()

  return (
    <div className="search-container">
      <div className="search-bar-container">
        <Select
          id="search-bar"
          options={pokemonList}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          filterOption={createFilter({ignoreCase: true})}
          value={search}
          onChange={(value) => dispatch(setSearch(value))}
        />
        <GameVersion setPokemonList={setPokemonList} />
      </div>
      <div className="stats-wrapper">
        <PokeTypes />
      </div>
    </div>
  )
}
export default InputPokemon
