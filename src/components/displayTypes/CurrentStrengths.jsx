import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {setAttack} from "../../store/slices/typesSlice"
import TypeColor from "../TypeColor"
import {
  handleTypeAdvantageBorder,
  currentTypes,
  atkAdvantages,
} from "../TypeUtilities"

const CurrentStrengths = () => {
  const dispatch = useDispatch()
  const stats = useSelector((store) => store.stats.value)
  const attack = useSelector((store) => store.currentTypes.attack)
  useEffect(() => {
    if (stats) {
      dispatch(setAttack(atkAdvantages(stats)))
    }
  }, [stats])
  // displays current strength advantages
  return attack && stats ? (
    <>
      <label className="advantage-label">Strong against: </label>
      <div className="strengths">
        {attack.map((atk) => {
          return (
            <h2
              className="strength-stat"
              key={uuid()}
              style={{
                background: TypeColor[atk],
                borderColor: handleTypeAdvantageBorder(
                  atk,
                  currentTypes(stats)?.[0],
                  currentTypes(stats)?.[1],
                  stats
                ),
              }}
            >
              {atk}
            </h2>
          )
        })}
      </div>
    </>
  ) : (
    ""
  )
}
export default CurrentStrengths
