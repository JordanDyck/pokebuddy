import {useMemo} from "react"

const PokeStats = ({stats}) => {
  const statData = useMemo(() => {
    return stats?.stats.map(({base_stat}) => base_stat)
  }, [stats])

  const statLabels = [
    "HP",
    "Attack",
    "Defense",
    "S-Attack",
    "S-Defense",
    "Speed",
  ]

  return (
    <div className="base-stats-container">
      <div className="label-wrapper">
        {statLabels.map((label, index) => {
          return (
            <label key={index} className="stat-label">
              {label}
            </label>
          )
        })}
      </div>
      <div className="bar-wrapper">
        {statData.map((stat, index) => {
          return (
            <div className="stat" key={[index]}>
              <div className="max-bar">
                <div
                  className="stat-bar"
                  style={{
                    width: `${(stat * 100) / 255}%`,
                  }}
                >
                  <div className="stat-number">{stat}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default PokeStats
