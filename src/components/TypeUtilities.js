import TypeColor from "./TypeColor"
import DamageTypes from "./DamageTypes"

export const getDamageGroup = (type, damageType, multiplier, stats) => {
  if (stats) {
    return DamageTypes?.[type]?.[damageType]?.[multiplier]
  }
}

// creates map of current types
export const currentTypes = (stats) => {
  if (stats) {
    return stats?.types?.map(({type}) => {
      return type.name
    })
  }
}

export const typeGroups = (stats) => {
  if (stats) {
    // creates the atk/def for each type.
    let atkTypesA =
      getDamageGroup(currentTypes(stats)[0], "attack", "double", stats) || []
    let atkTypesB =
      getDamageGroup?.(currentTypes(stats)?.[1], "attack", "double", stats) ||
      []
    let defTypesA =
      getDamageGroup(currentTypes(stats)[0], "defense", "double", stats) || []
    let defTypesB =
      getDamageGroup?.(currentTypes(stats)?.[1], "defense", "double", stats) ||
      []

    return {
      atkTypesA,
      atkTypesB,
      defTypesA,
      defTypesB,
    }
  }
}

export const immunities = (stats) => {
  if (stats) {
    return DamageTypes?.[currentTypes(stats)?.[0]]?.defense?.zero?.concat(
      DamageTypes?.[currentTypes(stats)[1]]?.defense?.zero || []
    )
  }
}

// filters out conflicting damage/defence types
export const getAdvantage = (groupA, groupB, damageType, stats) => {
  if (stats) {
    let allTypes = groupA.concat(groupB)
    currentTypes(stats)?.forEach((type) => {
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
}

export const atkAdvantages = (stats) => {
  if (stats) {
    return Array.from(
      new Set(
        getAdvantage(
          typeGroups(stats)?.atkTypesA,
          typeGroups(stats)?.atkTypesB,
          "attack",
          stats
        )
      )
    )
  }
}

export const defWeaknesses = (stats) => {
  if (stats) {
    return Array.from(
      new Set(
        getAdvantage(
          typeGroups(stats)?.defTypesA,
          typeGroups(stats)?.defTypesB,
          "defense",
          stats
        )
      )
    )
  }
}
// Matches the type color to what its strong against
export const handleTypeAdvantageBorder = (
  defendingType = "",
  attackingTypeA = "",
  attackingTypeB = "",
  stats
) => {
  if (stats) {
    const colorA = TypeColor[attackingTypeA]
    const colorB = TypeColor?.[attackingTypeB]
    const damageGroupA = getAdvantage(
      typeGroups(stats)?.atkTypesA,
      [],
      "attack",
      stats
    )
    const damageGroupB = getAdvantage(
      [],
      typeGroups(stats)?.atkTypesB,
      "attack",
      stats
    )

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
}
