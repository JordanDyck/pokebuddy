import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import TypeColor from "../TypeColor"
import {setImmunity} from "../../store/slices/typesSlice"
import {immunities} from "../TypeUtilities"

const CurrentImmunities = () => {
  const currentImmunities = useSelector((store) => store.currentTypes.immunity)
  const stats = useSelector((store) => store.stats.value)

  const dispatch = useDispatch()
  useEffect(() => {
    if (stats) {
      dispatch(setImmunity(immunities(stats)))
    }
  }, [stats])

  return currentImmunities?.length ? (
    <>
      <label className="advantage-label imunity-label">Immune to: </label>
      <div className="immunities">
        {currentImmunities.map((immunity) => {
          return (
            <label
              className="immunity-stat"
              key={uuid()}
              style={{background: TypeColor?.[immunity]}}
            >
              {immunity}
            </label>
          )
        })}
      </div>
    </>
  ) : (
    ""
  )
}
export default CurrentImmunities
