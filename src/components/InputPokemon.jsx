import axios from "axios"
import {useState, useMemo, useEffect} from "react"
import Select, {createFilter} from "react-select"
import {useSelector, useDispatch} from "react-redux"
import {GrNext, GrPrevious} from "react-icons/gr"

import {setSearch} from "../store/slices/searchSlice"
import GameVersion from "./GameVersion"
import alolaForms from "./Forms/AlolaForms.json"
import hisuianForms from "./Forms/HisuianForms.json"

const InputPokemon = ({loading}) => {
  const [pokemonList, setPokemonList] = useState([])
  const [searchForm, setSearchForm] = useState({value: "", label: ""})
  const search = useSelector((store) => store.search.value)
  const dispatch = useDispatch()

  // compaires base game pokemon to alt forms.
  const hasAltForm = useMemo(() => {
    if (search?.label) {
      const getName = (name) => {
        return name.split(" #")[0]
      }
      if (alolaForms[getName(search?.label)]?.base_id === search?.value) {
        return alolaForms[getName(search?.label)]?.id
      }
      if (hisuianForms[getName(search?.label)]?.base_id === search?.value) {
        return hisuianForms[getName(search?.label)]?.id
      }
    }
  }, [search])

  useEffect(() => {
    if (hasAltForm) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${hasAltForm}`)
        .then((res) => {
          setSearchForm({value: res?.data?.id, label: res?.data?.name})
        })
    }
  }, [hasAltForm])

  // gets current index of pokemonList and displays next or prev pokemon in that list.
  const getNext_prevPokemon = (num) => {
    for (let i = 0; i < search?.value; i++) {
      if (
        pokemonList?.[i]?.value === search.value &&
        pokemonList?.[i + num] !== undefined
      ) {
        dispatch(
          setSearch({
            value: pokemonList[i + num]?.value,
            label: pokemonList[i + num]?.label,
          })
        )
      }
    }
  }

  // if the next/prev pokemon in list exists, show next/prev button.
  const canPrev_NextPokemon = (numModifier) => {
    return pokemonList.some((pokemon, index) => {
      if (pokemon.label === search?.label) {
        return !!pokemonList?.[index + numModifier]
      } else return false
    })
  }
  return (
    <div className="search-container">
      <div className="search-bar-container">
        <Select
          id="search-bar"
          options={pokemonList}
          value={search}
          transition
          filterOption={createFilter({ignoreCase: true})}
          onChange={(value) => dispatch(setSearch(value))}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={{
            option: (base) => ({
              ...base,
              border: "1px solid #a9a9a9",
            }),
          }}
        />
        <GameVersion
          setPokemonList={setPokemonList}
          pokemonList={pokemonList}
        />
      </div>
      <div className="prev-next-buttons" key={loading ? 1 : 2}>
        <button
          className="prev-btn"
          onClick={() => getNext_prevPokemon(-1)}
          style={{
            display: canPrev_NextPokemon(-1) ? "initial" : "none",
          }}
        >
          <GrPrevious /> Prev
        </button>
        <button
          className="next-btn"
          onClick={() => getNext_prevPokemon(1)}
          style={{
            display: canPrev_NextPokemon(1) ? "initial" : "none",
          }}
        >
          Next <GrNext />
        </button>
      </div>
      <div
        className="alt-btn-container"
        style={{visibility: hasAltForm ? "visible" : "hidden"}}
      >
        <button
          className="alt-btn"
          onClick={() =>
            dispatch(
              setSearch({value: searchForm?.value, label: searchForm?.label})
            )
          }
        >
          Alt Form
        </button>
      </div>
    </div>
  )
}
export default InputPokemon
