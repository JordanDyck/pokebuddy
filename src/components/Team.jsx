import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {addTeamStat, removeTeamStat} from "../store/slices/teamSlice"
import {setSearch} from "../store/slices/searchSlice"
import {handleTypeAdvantageBorder} from "./TypeUtilities"
import TypeColor from "./TypeColor"
import {atkAdvantages} from "./TypeUtilities"

const Team = () => {
  const currentStats = useSelector((store) => store.stats.value)
  const teamStats = useSelector((store) => store.team.value)

  const dispatch = useDispatch()
  if (!currentStats?.id && !teamStats.length) {
    return ""
  } else {
    return (
      <div>
        <div className="btn-container">
          <button
            className="add-to-team-btn"
            onClick={() => {
              dispatch(addTeamStat(currentStats))
            }}
          >
            Add to team
          </button>
        </div>

        {/* creates team with strength labels */}
        <div className="team">
          {teamStats?.map(({name, id}, index) => (
            <div className="team-container" key={uuid()}>
              <div className="team-stat-container">
                {atkAdvantages(teamStats[index])?.map((types) => {
                  return (
                    <label
                      key={uuid()}
                      className="team-stat"
                      // style={{
                      //   background: TypeColor[atk],
                      //   borderColor: handleTypeAdvantageBorder(
                      //     atk,
                      //     teamStats.types?.[0],
                      //     teamStats.types?.[1],
                      //     currentStats
                      //   ),
                      // }}
                    >
                      {types}
                    </label>
                  )
                })}
              </div>
              <img
                className="team-sprite"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={`${name}`}
                value={id}
                onClick={() =>
                  dispatch(
                    setSearch({
                      value: id,
                      label: `${name} #${id}`,
                    })
                  )
                }
              />
              <div className="btn-container">
                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeTeamStat(id))}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default Team
