import {useSelector} from "react-redux"

import CurrentWeaknesses from "./displayTypes/CurrentWeaknesses"
import CurrentStrengths from "./displayTypes/CurrentStrengths"
import CurrentImmunities from "./displayTypes/CurrentImmunities"
import TypeColor from "./TypeColor"

const TypeAdvantages = () => {
  const stats = useSelector((store) => store.stats.value)

  const color1 = stats.types[0].type.name
  const color2 = stats.types[1]?.type.name

  return (
    <div
      className="strengths_weaknesses-container"
      style={{
        background: `linear-gradient(314deg, ${TypeColor[color1] + 90} 47%, ${
          color2 ? TypeColor[color2] + 99 : TypeColor[color1] + 90
        } 81%)`,
        borderColor: `${TypeColor[color1]}`,
      }}
    >
      <CurrentStrengths />
      <CurrentWeaknesses />
      <CurrentImmunities />
    </div>
  )
}

export default TypeAdvantages
