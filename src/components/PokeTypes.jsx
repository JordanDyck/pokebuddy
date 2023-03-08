import axios from "axios"
import {useEffect} from "react"

import {useSelector, useDispatch} from "react-redux"
import {setStat} from "../store/slices/statSlice"
import MainTypes from "./displayTypes/MainTypes"
import PokeStats from "./PokeStats"
import TypeAdvantages from "./TypeAdvantages"

const PokeTypes = ({loading, setLoading}) => {
  //grabs data from store.
  const stats = useSelector((store) => store.stats.value)
  const search = useSelector((store) => store.search.value)

  // puts data into store
  const dispatch = useDispatch()

  // gets and stores stat data for current pokemon.
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

  if (loading) return <div className="loading"></div>

  return (
    <div className="stats-container">
      {stats && !loading ? (
        <>
          <div className="sprite-wrapper">
            <img
              className="sprite"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stats.id}.png`}
              alt=""
            />
            <MainTypes />
          </div>

          <TypeAdvantages />
          <PokeStats stats={stats} />
        </>
      ) : (
        ""
      )}
    </div>
  )
}
export default PokeTypes
