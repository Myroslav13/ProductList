import { useState } from 'react'
import './App.css'
import Cart from "./components/Cart"
import List from "./components/List"
import Confirmation from "./components/Confirmation"

function App() {
  interface ImageSet {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  }

  interface dessertData {
    image: ImageSet;
    name: string;
    quantity: number;
    price: number;
  }

  const[chosenCarts, setChosenCarts] = useState<dessertData[]>([]);
  const[addButtonClicked, setAddButtonClicked] = useState(false);
  const[submitButtonClicked, setSubmitButtonClicked] = useState(false);

  return (
    <>
      <div className='d-md-flex gap-2'>
        <List chosenCarts={chosenCarts} setChosenCarts={setChosenCarts} setAddButtonClicked={setAddButtonClicked}></List>
        <Cart chosenCarts={chosenCarts} setChosenCarts={setChosenCarts} setSubmitButtonClicked={setSubmitButtonClicked}></Cart>
      </div>

      {submitButtonClicked === true? <Confirmation setSubmitButtonClicked={setSubmitButtonClicked} chosenCarts={chosenCarts} setChosenCarts={setChosenCarts}></Confirmation>: <></>}
    </>
  )
}

export default App
