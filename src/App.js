import "./styles/App.scss"
import "./styles/Title.scss"
import "./styles/Search.scss"
import "./styles/Stats.scss"
import "./styles/Team.scss"
import {useState} from "react"

import Title from "./components/Title"
import InputPokemon from "./components/InputPokemon"
import PokeTypes from "./components/PokeTypes"
import Team from "./components/Team"

function App() {
  const [loading, setLoading] = useState(true)
  return (
    <div className="content-wrapper">
      <Title />
      <InputPokemon loading={loading} />
      <PokeTypes loading={loading} setLoading={setLoading} />
      <Team loading={loading} />
    </div>
  )
}

export default App
