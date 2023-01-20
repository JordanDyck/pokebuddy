import {useSelector} from "react-redux"
import {v4 as uuid} from "uuid"

import TypeColor from "../TypeColor"

// displays current weakness types
const CurrentWeaknesses = () => {
  const weaknesses = useSelector((store) => store.currentTypes.weakness)

  return weaknesses.length ? (
    <>
      <label className="advantage-label">Weak against: </label>
      <div className="weaknesses">
        {weaknesses.map((weakness) => {
          return (
            <h2
              className="weakness-stat"
              key={uuid()}
              style={{background: TypeColor[weakness]}}
            >
              {weakness}
            </h2>
          )
        })}
      </div>
    </>
  ) : (
    ""
  )
}
export default CurrentWeaknesses
