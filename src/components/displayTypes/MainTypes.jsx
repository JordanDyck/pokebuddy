import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {setTypes} from "../../store/slices/typesSlice"
import TypeColor from "../TypeColor"
import {currentTypes} from "../TypeUtilities"

const MainTypes = () => {
  const stats = useSelector((store) => store.stats.value)
  const types = useSelector((store) => store.currentTypes.type)

  const dispatch = useDispatch()

  useEffect(() => {
    if (stats) {
      dispatch(setTypes(currentTypes(stats)))
    }
  }, [stats])

  return types ? (
    <div className="types">
      {types.map((type) => {
        return (
          <label
            className="type-stat"
            key={uuid()}
            style={{background: TypeColor[type]}}
          >
            {type}
          </label>
        )
      })}
    </div>
  ) : (
    ""
  )
}
export default MainTypes
