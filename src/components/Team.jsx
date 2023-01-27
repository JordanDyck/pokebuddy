import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {addTeamStat, removeTeamStat} from "../store/slices/teamSlice"
import {setSearch} from "../store/slices/searchSlice"

const Team = () => {
  const currentStats = useSelector((store) => store.stats.value)
  const teamStats = useSelector((store) => store.team.value)
  const attack = useSelector((store) => store.currentTypes.attack)
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
        <div className="team">
          {teamStats.map(({name, id}) => (
            <div className="team-container" key={uuid()}>
              <div className="team-stat-container">
                <h4 className="strength-stat">{attack}</h4>
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
