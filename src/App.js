import "./App.scss"
import "./styles/desktop/Title.scss"
import "./styles/desktop/Search.scss"
import "./styles/desktop/Stats.scss"
import "./styles/desktop/Team.scss"
import InputPokemon from "./components/InputPokemon"
import Title from "./components/Title"
import Team from "./components/Team"

function App() {
  return (
    <div className="content-wrapper">
      <Title />
      <InputPokemon />
      <Team />
    </div>
  )
}

export default App
