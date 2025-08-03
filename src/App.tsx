import { useState } from 'react'
import './App.css'
import Cart from "./components/Cart"
import List from "./components/List"

function App() {
  const[] = useState();

  return (
    <div className='d-flex gap-2'>
      <List></List>
      <Cart></Cart>
    </div>
  )
}

export default App
