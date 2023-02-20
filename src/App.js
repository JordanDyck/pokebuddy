import "./App.scss"
import "./styles/Title.scss"
import "./styles/mobile/Search_Mobile.scss"
import "./styles/mobile/Stats_Mobile.scss"
import "./styles/mobile/Team_Mobile.scss"

import Title from "./components/Title"
import InputPokemon from "./components/InputPokemon"
import PokeTypes from "./components/PokeTypes"
import Team from "./components/Team"

// mobile should be 410

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
