import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import TypeColor from "../TypeColor"
import {setWeakness} from "../../store/slices/typesSlice"
import {defWeaknesses} from "../TypeUtilities"

// displays current weakness types
const CurrentWeaknesses = () => {
  const stats = useSelector((store) => store.stats.value)
  const weaknesses = useSelector((store) => store.currentTypes.weakness)
  const dispatch = useDispatch()

  useEffect(() => {
    if (stats) {
      dispatch(setWeakness(defWeaknesses(stats)))
    }
  }, [stats])

  return weaknesses ? (
    <>
      <label className="advantage-label weakness-label">Weak against: </label>
      <div className="weaknesses">
        {weaknesses.map((weakness) => {
          return (
            <label
              className="weakness-stat"
              key={uuid()}
              style={{background: TypeColor[weakness]}}
            >
              {weakness}
            </label>
          )
        })}
      </div>
    </>
  ) : (
    ""
  )
}
export default CurrentWeaknesses
