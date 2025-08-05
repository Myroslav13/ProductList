import type { Dispatch, SetStateAction } from "react"
import type {dessertData} from "./interfaces"

interface Props{
  chosenCarts: dessertData[],
  setSubmitButtonClicked: Dispatch<SetStateAction<boolean>>,
  setChosenCarts: Dispatch<SetStateAction<dessertData[]>>,
}

function Confirmation({setSubmitButtonClicked, chosenCarts, setChosenCarts}:Props) {
  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content p-4">

            <div className="text-start">
              <img src="/assets/images/icon-order-confirmed.svg"/>
              <h2 className="modal-title fw-bold mt-3">Order Confirmed</h2>
              <p className="p-modal-wish">We hope you enjoy your food!</p>
            </div>

            <div className="modal-middle">
              <div className="p-3 rounded-3 pb-0">
                {chosenCarts.map((el) =>
                <>
                  <div className="d-flex align-items-center gap-3">
                    <img src={el.image.desktop} alt={el.name} title={el.name} width={80} className="rounded-2"/>
                    
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="text-start">
                        <p className="fw-bold mb-2 p-name-in-cart">{el.name}</p>
                        <div>
                          <p className=""><span className="p-span-quantity">{el.quantity}x</span> <span className="p-span-price">@${el.price}</span></p>
                        </div>
                      </div>

                      <div>
                        <p><span className="p-span-cost">${el.quantity * el.price}</span></p>
                      </div>
                    </div>
                  </div>

                  <hr/>
                </>
                )}
              </div>

              <div className="d-flex justify-content-between px-3">
                <p>Order Total</p>
                <h3>${chosenCarts.reduce((sum, el) => sum + el.price*el.quantity, 0)}</h3>
              </div>
            </div>

            <div>
              <button className="btn-submit mt-4" onClick={() => {setSubmitButtonClicked(false); setChosenCarts([])}}>Start New Order</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Confirmation
