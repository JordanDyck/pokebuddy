import axios from "axios"
import { useEffect, useState, useMemo } from "react"
import { v4 as uuid } from "uuid"
import DamageTypes from "./DamageTypes"
import TypeColor from "./TypeColor"

const PokeStats = ({ search }) => {
  const [stats, setStats] = useState()

  // displays pokemon types/strengths/weaknesses.
  const types = useMemo(() => {
    if (stats) {
      const getDamageGroup = (type, damageType, multiplier) => {
        return DamageTypes?.[type]?.[damageType]?.[multiplier]
      }

      // creates map of current types
      const currentTypes = stats.types.map(({ type }) => {
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

      const atkAdvantages = getAdvantage(atkTypesA, atkTypesB, "attack")
      const defWeaknesses = getAdvantage(defTypesA, defTypesB, "defense")

      return (
        <>
          {/* displays current types  */}
          <div className="types">
            {currentTypes.map((type) => {
              return (
                <h2
                  className="type-stat"
                  key={uuid()}
                  style={{ background: TypeColor[type] }}
                >
                  {type}
                </h2>
              )
            })}
          </div>

          {/* displays current strength types  */}

          <div className="strengths_weaknesses-container">
            {atkAdvantages.length ? (
              <>
                <label>Strong against: </label>
                <div className="strengths">
                  {atkAdvantages.map((atk) => {
                    return (
                      <h2
                        className="strength-stat"
                        key={uuid()}
                        style={{ background: TypeColor[atk] }}
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
                <label>weak against: </label>
                <div className="weaknesses">
                  {defWeaknesses.map((weakness) => {
                    return (
                      <h2
                        className="weakness-stat"
                        key={uuid()}
                        style={{ background: TypeColor[weakness] }}
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
                        style={{ background: TypeColor[immunity] }}
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
          <img className="sprite" src={stats.sprites.front_default} alt="" />
          {types}
        </>
      ) : (
        ""
      )}
    </div>
  )
}
export default PokeStats
