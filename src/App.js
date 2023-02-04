import "./App.scss"
import InputPokemon from "./components/InputPokemon"
import Title from "./components/Title"
import Team from "./components/Team"

// to add alola region: get pokemon by species, look for varieties, search pokemon id from there.

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
