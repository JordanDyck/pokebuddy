import {useMemo, useRef} from "react"

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

  const barRef = useRef(null)

  return (
    <div className="base-stats-container" ref={barRef}>
      {statData.map((stat, index) => {
        return (
          <div className="stat" key={statLabels[index]}>
            <label className="stat-label">{`${statLabels[index]}: `}</label>
            <div className="max-bar">
              <div
                className="stat-bar"
                style={{
                  width: `${stat}px`,
                }}
              >
                <div className="stat-number">{stat}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default PokeStats
