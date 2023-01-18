import {v4 as uuid} from "uuid"

import TypeColor from "../TypeColor"

// displays current weakness types
const CurrentWeaknesses = ({defWeaknesses}) => {
  return defWeaknesses.length ? (
    <>
      <label className="advantage-label">Weak against: </label>
      <div className="weaknesses">
        {defWeaknesses.map((weakness) => {
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
