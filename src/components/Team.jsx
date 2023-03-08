import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {addTeamStat, removeTeamStat} from "../store/slices/teamSlice"
import {setSearch} from "../store/slices/searchSlice"
import {handleTypeAdvantageBorder} from "./TypeUtilities"
import TypeColor from "./TypeColor"
import {atkAdvantages} from "./TypeUtilities"

const Team = ({loading}) => {
  const currentStats = useSelector((store) => store.stats.value)
  const teamStats = useSelector((store) => store.team.value)
  const dispatch = useDispatch()

  if (!currentStats?.id && !teamStats.length) {
    return ""
  } else if (!loading) {
    return (
      <div className="team-wrapper">
        <div className="btn-container" key={loading ? 1 : 2}>
          <button
            className="add-to-team-btn"
            disabled={teamStats.length >= 6}
            onClick={() => {
              // clickRef.current.className = "btn-container"
              dispatch(addTeamStat(currentStats))
            }}
          >
            Add to team
          </button>
        </div>

        {/* displays each team member */}
        <div className="team">
          {teamStats?.map(({name, id}, index) => (
            <div className="team-container" key={uuid()}>
              <div className="team-stat-container">
                {/* displays advantage types with advantage border */}
                {atkAdvantages(teamStats[index]).length ? (
                  atkAdvantages(teamStats[index])?.map((types) => {
                    return (
                      <label
                        key={uuid()}
                        className="team-stat"
                        style={{
                          background: TypeColor[types],
                          borderColor: handleTypeAdvantageBorder(
                            types,
                            teamStats[index].types?.[0]?.type?.name,
                            teamStats[index].types?.[1]?.type?.name,
                            teamStats[index]
                          ),
                        }}
                      >
                        {types}
                      </label>
                    )
                  })
                ) : (
                  <label className="no-strengths">No Strengths</label>
                )}
              </div>
              <img
                className="team-sprite"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={`${name}`}
                value={id}
                onClick={() =>
                  // sets selected team member as current pokemon.
                  dispatch(
                    setSearch({
                      value: id,
                      label: `${name} ${
                        name.includes("-alola") || name.includes("-hisui")
                          ? ""
                          : "#" + id
                      }`,
                    })
                  )
                }
              />
              <div className="btn-container">
                {/* removes selected pokemon from team and local storage */}
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
