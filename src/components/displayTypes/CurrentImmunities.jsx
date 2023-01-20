import {useSelector} from "react-redux"
import {v4 as uuid} from "uuid"

import TypeColor from "../TypeColor"

const CurrentImmunities = () => {
  const immunities = useSelector((store) => store.currentTypes.immunity)

  return immunities.length ? (
    <>
      <label className="advantage-label">Immune to: </label>
      <div className="immunities">
        {immunities.map((immunity) => {
          return (
            <h2
              className="immunity-stat"
              key={uuid()}
              style={{background: TypeColor?.[immunity]}}
            >
              {immunity}
            </h2>
          )
        })}
      </div>
    </>
  ) : (
    ""
  )
}
export default CurrentImmunities
