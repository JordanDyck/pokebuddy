import { useState } from "react"
import Select, { createFilter } from "react-select"
import GameVersion from "./GameVersion"
import PokeStats from "./PokeStats"

const InputPokemon = () => {
  const [pokemonList, setPokemonList] = useState([])
  const [search, setSearch] = useState({
    value: "bulbasaur",
    label: "bulbasaur",
  })

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
          filterOption={createFilter({ ignoreCase: true, matchFrom: "start" })}
          value={search}
          onChange={setSearch}
        />
        <GameVersion setPokemonList={setPokemonList} />
      </div>
      <div className="stats-wrapper">
        <PokeStats search={search} />
      </div>
    </div>
  )
}
export default InputPokemon
