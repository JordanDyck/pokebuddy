import "./styles/App.scss"
import "./styles/Title.scss"
import "./styles/Search.scss"
import "./styles/Stats.scss"
import "./styles/Team.scss"

import Title from "./components/Title"
import InputPokemon from "./components/InputPokemon"
import PokeTypes from "./components/PokeTypes"
import Team from "./components/Team"

function App() {
  return (
    <div className="content-wrapper">
      <Title />
      <InputPokemon />
      <PokeTypes />
      <Team />
    </div>
  )
}

export default App
