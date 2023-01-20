import axios from "axios"
import {useEffect, useState} from "react"

import {useSelector, useDispatch} from "react-redux"
import {setStat} from "../store/slices/statSlice"
import CurrentTypes from "./displayTypes/CurrentTypes"
import PokeStats from "./PokeStats"
import TypeAdvantages from "./TypeAdvantages"

const PokeTypes = () => {
  //grabs data from store.
  const stats = useSelector((store) => store.stats.value)
  const search = useSelector((store) => store.search.value)
  // const typess = useSelector((store) => store.types.value)
  // puts data into store
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  // gets and stores data for current pokemon.
  useEffect(() => {
    setLoading(true)
    if (stats?.name !== search?.value) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${search.value}`)
        .then((res) => {
          dispatch(setStat(res.data))
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [search])

  if (loading)
    return (
      <div className="loading">
        <h1 className="loading-text">loading...</h1>
      </div>
    )

  return (
    <div className="stats-container">
      {stats ? (
        <>
          <PokeStats stats={stats} />
          <div className="sprite-wrapper">
            <img
              className="sprite"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stats.id}.png`}
              alt=""
            />
            <CurrentTypes />
          </div>

          <TypeAdvantages />
        </>
      ) : (
        ""
      )}
    </div>
  )
}
export default PokeTypes
