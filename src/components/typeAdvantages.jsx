import {useMemo} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"

import TypeColor from "./TypeColor"
import DamageTypes from "./DamageTypes"
import {
  setTypes,
  setAttack,
  setWeakness,
  setImmunity,
} from "../store/slices/typesSlice"
import CurrentWeaknesses from "./displayTypes/CurrentWeaknesses"
import CurrentStrengths from "./displayTypes/CurrentStrengths"
import CurrentImmunities from "./displayTypes/CurrentImmunities"

const TypeAdvantages = () => {
  const stats = useSelector((store) => store.stats.value)

  const dispatch = useDispatch()

  const getDamageGroup = (type, damageType, multiplier) => {
    return DamageTypes?.[type]?.[damageType]?.[multiplier]
  }

  // creates map of current types
  const currentTypes = stats.types.map(({type}) => {
    return type.name
  })

  const typeGroups = useMemo(() => {
    // creates the atk/def for each type.
    let atkTypesA = getDamageGroup(currentTypes[0], "attack", "double") || []
    let atkTypesB =
      getDamageGroup?.(currentTypes?.[1], "attack", "double") || []
    let defTypesA = getDamageGroup(currentTypes[0], "defense", "double") || []
    let defTypesB =
      getDamageGroup?.(currentTypes?.[1], "defense", "double") || []

    return {
      atkTypesA,
      atkTypesB,
      defTypesA,
      defTypesB,
    }
  }, [currentTypes])

  const immunities = DamageTypes?.[currentTypes?.[0]]?.defense?.zero?.concat(
    DamageTypes?.[currentTypes[1]]?.defense?.zero || []
  )

  // filters out conflicting damage/defence types
  const getAdvantage = (groupA, groupB, damageType) => {
    let allTypes = groupA.concat(groupB)
    currentTypes?.forEach((type) => {
      allTypes.forEach((advantageType, index) => {
        // Remove any advantages that are half damage in other type
        if (DamageTypes[type][damageType].half.includes(advantageType)) {
          allTypes.splice(index, 1)
        }
        // Remove any advantages that are zero damage in other type
        if (DamageTypes[type][damageType].zero.includes(advantageType)) {
          allTypes.splice(index, 1)
        }
      })
    })
    return allTypes
  }

  const atkAdvantages = Array.from(
    new Set(
      getAdvantage(typeGroups?.atkTypesA, typeGroups?.atkTypesB, "attack")
    )
  )
  const defWeaknesses = Array.from(
    new Set(
      getAdvantage(typeGroups?.defTypesA, typeGroups?.defTypesB, "defense")
    )
  )

  // Matches the type color to what its strong against
  const handleTypeAdvantageBorder = (
    defendingType = "",
    attackingTypeA = "",
    attackingTypeB = ""
  ) => {
    const colorA = TypeColor[attackingTypeA]
    const colorB = TypeColor?.[attackingTypeB]
    const damageGroupA = getAdvantage(typeGroups?.atkTypesA, [], "attack")
    const damageGroupB = getAdvantage([], typeGroups?.atkTypesB, "attack")

    if (
      damageGroupA.some(() =>
        DamageTypes[defendingType]?.["defense"].double.includes(attackingTypeA)
      )
    ) {
      return colorA
    } else if (
      damageGroupB.some(() =>
        DamageTypes[defendingType]?.["defense"].double.includes(attackingTypeB)
      )
    ) {
      return colorB
    }
  }

  useEffect(() => {
    if (stats) {
      dispatch(setTypes(currentTypes))
      dispatch(setAttack(atkAdvantages))
      dispatch(setWeakness(defWeaknesses))
      dispatch(setImmunity(immunities))
    }
  }, [stats])

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
