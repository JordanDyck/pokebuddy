import CurrentWeaknesses from "./displayTypes/CurrentWeaknesses"
import CurrentStrengths from "./displayTypes/CurrentStrengths"
import CurrentImmunities from "./displayTypes/CurrentImmunities"

const TypeAdvantages = () => {
  return (
    <div className="strengths_weaknesses-container">
      <p className="border-info-text">
        *the border color represents the type of attack to use
      </p>
      <CurrentStrengths />
      <CurrentWeaknesses />
      <CurrentImmunities />
    </div>
  )
}

export default TypeAdvantages
