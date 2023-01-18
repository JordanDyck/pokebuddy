import {v4 as uuid} from "uuid"

import TypeColor from "../TypeColor"

const CurrentTypes = ({currentTypes}) => {
  return currentTypes ? (
    <div className="types">
      {currentTypes.map((type) => {
        return (
          <h2
            className="type-stat"
            key={uuid()}
            style={{background: TypeColor[type]}}
          >
            {type}
          </h2>
        )
      })}
    </div>
  ) : (
    ""
  )
}
export default CurrentTypes
