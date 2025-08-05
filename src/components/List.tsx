import { useEffect, useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type {dessertData} from "./interfaces"

interface Props {
    chosenCarts: dessertData[],
    setChosenCarts: Dispatch<SetStateAction<dessertData[]>>,
    setAddButtonClicked: Dispatch<SetStateAction<boolean>>
}

function List({chosenCarts, setChosenCarts, setAddButtonClicked}:Props) {
    const [dataJson, setDataJson] = useState<any[]>([]);

    useEffect(() => {
        fetch("/data.json").then(response => response.json()).then(data => setDataJson(data));
    });

    function handleRemoveCartClick(item: dessertData) {
        setChosenCarts(prev =>
            prev
            .map(cartItem =>
                cartItem.name === item.name
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            )
            .filter(cartItem => cartItem.quantity > 0)
        );
    }

    function handleAddToCartClick(item: dessertData) {
        setAddButtonClicked(true);
        setChosenCarts((prev) => {
            const existingItem = prev.find(cartItem => cartItem.name === item.name);

            if (existingItem) {
                return prev.map(cartItem =>
                    cartItem.name === item.name
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                );
            }

            return [...prev, { ...item, quantity: 1 }];
        });

    }

    return (
        <div className="d-flex flex-column">  
            <div>
                <h1 className="text-start h1-desserts fs-2 fw-bold pb-3">Desserts</h1>
            </div>
            <div className="container text-center">
                <div className="row align-items-start">
                    {dataJson.map((el, index) =>
                        <div key={index} className="div-card-wrapper col-10 col-md-4 mb-3 px-0 mx-auto">
                            <div className="card p-0 bg-transparent border border-0">
                                <div>      
                                    {
                                        chosenCarts.find(arEl => arEl.name === el.name && arEl.quantity > 0) ? 
                                        <>
                                            <img src={`${el.image.desktop}`} alt={el.name} title={el.name} width={250} className="rounded-2 img-chosen"/>
                                            <div className="d-flex justify-content-center button-div-wrapper">
                                                <div className="button-div">
                                                    <button className="button-change-quantity" onClick={() => handleRemoveCartClick(
                                                    {   
                                                        image: el.image,
                                                        name: el.name,
                                                        quantity: 1,
                                                        price: el.price
                                                    }
                                                    )}>
                                                        <img src="/assets/images/icon-decrement-quantity.svg"/>
                                                    </button>

                                                    <p className="text-white m-0 fx-bold">{chosenCarts.find(arEl => arEl.name === el.name)?.quantity}</p>

                                                    <button className="button-change-quantity" onClick={() => handleAddToCartClick(
                                                    {
                                                        image: el.image,
                                                        name: el.name,
                                                        quantity: 1,
                                                        price: el.price
                                                    }
                                                    )}>
                                                        <img src="/assets/images/icon-increment-quantity.svg"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <img src={`${el.image.desktop}`} alt={el.name} title={el.name} width={250} className="rounded-2 img-not-chosen"/>
                                            <button className="btn rounded-5 px-4 bg-white add-to-cart-button" onClick={() => handleAddToCartClick(
                                                {
                                                    image: el.image,
                                                    name: el.name,
                                                    quantity: 1,
                                                    price: el.price
                                                }
                                            )}>
                                                <img src="/assets/images/icon-add-to-cart.svg"/>Add to Cart
                                            </button>
                                        </>
                                    }
                                </div>
                                <div className="card-body text-start p-0 pt-2">
                                    <p className="fs-6 mb-0 p-category">{el.category}</p>
                                    <p className="fs-6 fw-bold my-0">{el.name}</p>
                                    <p className="fs-6 fw-bold p-price">${el.price}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default List
