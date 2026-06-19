import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mt-5">
      <h1>OctoFit Tracker</h1>
      <p>Welcome to OctoFit Tracker!</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>
    </div>
  )
}

export default App
