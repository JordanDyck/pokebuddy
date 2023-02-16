import CurrentWeaknesses from "./displayTypes/CurrentWeaknesses"
import CurrentStrengths from "./displayTypes/CurrentStrengths"
import CurrentImmunities from "./displayTypes/CurrentImmunities"

const TypeAdvantages = () => {
  return (
    <div className="strengths_weaknesses-container">
      <CurrentStrengths />
      <CurrentWeaknesses />
      <CurrentImmunities />
    </div>
  )
}

export default TypeAdvantages
