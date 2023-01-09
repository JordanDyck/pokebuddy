import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {addTeamStat} from "../store/slices/teamSlice"

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
        <div className="team">
          {teamStats.map((pokemon) => (
            <div className="team-container" key={uuid()}>
              <img
                className="team-sprite"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default Team
