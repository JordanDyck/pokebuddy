import CurrentWeaknesses from "./displayTypes/CurrentWeaknesses"
import CurrentStrengths from "./displayTypes/CurrentStrengths"
import CurrentImmunities from "./displayTypes/CurrentImmunities"

const TypeAdvantages = ({currentTypes, handleTypeAdvantageBorder}) => {
  return (
    <div className="strengths_weaknesses-container">
      <CurrentStrengths
        currentTypes={currentTypes}
        handleTypeAdvantageBorder={handleTypeAdvantageBorder}
      />
      <CurrentWeaknesses />
      <CurrentImmunities />
    </div>
  )
}

export default TypeAdvantages
