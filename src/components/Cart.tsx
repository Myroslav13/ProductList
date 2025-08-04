import type { Dispatch, SetStateAction } from "react"

interface dessertData {
  name: string;
  quantity: number; 
  price: number;
}

interface Props {
  chosenCarts: dessertData[],
  setChosenCarts: Dispatch<SetStateAction<dessertData[]>>,
}

function Cart({chosenCarts, setChosenCarts}:Props) {
  function handleRemoveClick(item: dessertData) {
    setChosenCarts(prev => prev.filter(el => el.name !== item.name));
  }

  return (
    <div className="bg-white h-25 p-3 rounded-2 cart-div">
        <h1 className="fs-3 h1-cart text-start mb-3">Your Cart ({chosenCarts.length})</h1>
        {chosenCarts.length === 0 ?
          <div>
              <img src="/assets/images/illustration-empty-cart.svg" alt="illustration empty cart"/>
              <p className="fs-6 p-cart">Your added items will appear here</p>
          </div> 
          :
          <>
            {chosenCarts.map((el) => 
              <div className="d-flex align-items-center justify-content-between">
                <div className="text-start">
                  <p className="fw-bold mb-2 p-name-in-cart">{el.name}</p>
                  <div>
                      <p><span className="p-span-quantity">{el.quantity}x</span> <span className="p-span-price">@${el.price}</span> <span className="p-span-cost">${el.quantity * el.price}</span></p>
                  </div>
                </div>

                <button className="btn-remove-item" onClick={() => handleRemoveClick(el)}>
                  <img src="/assets/images/icon-remove-item.svg"/>
                </button>
              </div>
            )}

            <hr/>  

            <div className="d-flex justify-content-between">
              <p>Order total</p>
              <h3>${}</h3>
            </div>

            <div className="div-delivery-info rounded-2 p-2 mt-2 w-100">
              <p className="m-0"><img src="/assets/images/icon-carbon-neutral.svg" alt="icon carbon neutral"/>This is a <b>carbon-neutral</b> delivery</p>
            </div>

            <button className="btn-submit mt-4">Confirm Order</button>
          </>
        }
    </div>
  )
}

export default Cart