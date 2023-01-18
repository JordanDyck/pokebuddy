import {v4 as uuid} from "uuid"

import TypeColor from "../TypeColor"

const CurrentStrengths = ({
  atkAdvantages,
  currentTypes,
  handleTypeAdvantageBorder,
}) => {
  // displays current strength types
  return atkAdvantages.length ? (
    <>
      <label className="advantage-label">Strong against: </label>
      <div className="strengths">
        {atkAdvantages.map((atk) => {
          return (
            <h2
              className="strength-stat"
              key={uuid()}
              style={{
                background: TypeColor[atk],
                borderColor: handleTypeAdvantageBorder(
                  atk,
                  currentTypes[0],
                  currentTypes[1]
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
