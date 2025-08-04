import { useState } from 'react'
import './App.css'
import Cart from "./components/Cart"
import List from "./components/List"

function App() {
  interface dessertData {
    name: string;
    quantity: number; 
    price: number;
  }

  const[chosenCarts, setChosenCarts] = useState<dessertData[]>([]);
  const[addButtonClicked, setAddButtonClicked] = useState(false);

  return (
    <div className='d-flex gap-2'>
      <List chosenCarts={chosenCarts} setChosenCarts={setChosenCarts} setAddButtonClicked={setAddButtonClicked}></List>
      <Cart chosenCarts={chosenCarts} setChosenCarts={setChosenCarts}></Cart>
    </div>
  )
}

export default App
