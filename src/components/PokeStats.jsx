import axios from "axios"
import {useEffect, useMemo} from "react"
import {v4 as uuid} from "uuid"
import DamageTypes from "./DamageTypes"
import TypeColor from "./TypeColor"

const PokeStats = ({search, stats, setStats}) => {
  // displays pokemon types/strengths/weaknesses.
  const types = useMemo(() => {
    if (stats) {
      const getDamageGroup = (type, damageType, multiplier) => {
        return DamageTypes?.[type]?.[damageType]?.[multiplier]
      }

      // creates map of current types
      const currentTypes = stats.types.map(({type}) => {
        return type.name
      })

      let atkTypesA = getDamageGroup(currentTypes[0], "attack", "double") || []
      let atkTypesB =
        getDamageGroup?.(currentTypes?.[1], "attack", "double") || []
      let defTypesA = getDamageGroup(currentTypes[0], "defense", "double") || []
      let defTypesB =
        getDamageGroup?.(currentTypes?.[1], "defense", "double") || []

      const immunities = DamageTypes[currentTypes[0]].defense.zero.concat(
        DamageTypes?.[currentTypes[1]]?.defense?.zero || []
      )

      const getAdvantage = (groupA, groupB, damageType) => {
        let allTypes = groupA.concat(groupB)
        currentTypes.forEach((type) => {
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


      const atkAdvantages = Array.from(new Set(getAdvantage(atkTypesA, atkTypesB, "attack")))
      const defWeaknesses = Array.from(new Set(getAdvantage(defTypesA, defTypesB, "defense")))

      // Matches the type color to what its strong against
      const handleTypeAdvantageBorder = (defendingType = '', attackingTypeA = '', attackingTypeB = '') => {
        const colorA = TypeColor[attackingTypeA]
        const colorB = TypeColor?.[attackingTypeB]
        const damageGroupA = getAdvantage(atkTypesA, [], "attack")
        const damageGroupB = getAdvantage([], atkTypesB, "attack")

        if (damageGroupA.some(() => DamageTypes[defendingType]?.['defense'].double.includes(attackingTypeA))) {
          return colorA;
        }

        else if (damageGroupB.some(() => DamageTypes[defendingType]?.['defense'].double.includes(attackingTypeB))) {
          return colorB;
        }
      }
      

      return (
        <>
          {/* displays current types  */}
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

          <div className="strengths_weaknesses-container">
            {/* displays current strength types  */}
            {atkAdvantages.length ? (
              <>
                <label>Strong against: </label>
                <div className="strengths">
                  {atkAdvantages.map((atk) => {
                    return (
                      <h2
                        className="strength-stat"
                        key={uuid()}
                        style={{
                          background: TypeColor[atk], 
                          borderColor: handleTypeAdvantageBorder(atk, currentTypes[0], currentTypes[1]) 
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
            )}

            {/* displays current weakness types  */}
            {defWeaknesses.length ? (
              <>
                <label>Weak against: </label>
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
            )}

            {immunities.length ? (
              <>
                <label>Immune to: </label>
                <div className="immunities">
                  {immunities.map((immunity) => {
                    return (
                      <h2
                        className="immunity-stat"
                        key={uuid()}
                        style={{background: TypeColor[immunity]}}
                      >
                        {immunity}
                      </h2>
                    )
                  })}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      )
    } else {
      return ""
    }
  }, [stats])

  useEffect(() => {
    if (stats?.name !== search.value) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${search.value}`)
        .then((res) => {
          setStats(res.data)
        })
    }
  }, [search])

  return (
    <div className="stats-container">
      {stats ? (
        <>
          <img
            className="sprite"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stats.id}.png`}
            alt=''
          />
          {types}
        </>
      ) : (
        ""
      )}
    </div>
  )
}
export default PokeStats
