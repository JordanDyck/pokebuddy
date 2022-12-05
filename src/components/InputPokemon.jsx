import { useState } from "react"
import Select, { createFilter } from "react-select"
import GameVersion from "./GameVersion"
import PokeStats from "./PokeStats"

const InputPokemon = () => {
  const [pokemonList, setPokemonList] = useState([])
  const [stats, setStats] = useState()
  const [search, setSearch] = useState({
    value: 1,
    label: "bulbasaur #1",
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
          filterOption={createFilter({ ignoreCase: true })}
          value={search}
          onChange={setSearch}
        />
        <GameVersion setPokemonList={setPokemonList} />
      </div>
      <div className="stats-wrapper">
        <PokeStats search={search} stats={stats} setStats={setStats} />
      </div>
    </div>
  )
}
export default InputPokemon
