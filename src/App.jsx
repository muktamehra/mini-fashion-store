import Header from './Header'
import Hero from './Hero'
import './Hero.css'

function App() { // ← this is a React component
  return (     //← everything inside here shows on the page
    <div>
      <Header />
      <Hero />
    </div>
  )
}

export default App  // ← makes this component available to other files