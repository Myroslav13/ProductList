import { useEffect, useState } from "react"
import type { Dispatch, SetStateAction } from "react"

interface dessertData {
    name: string;
    quantity: number; 
    price: number;
}

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
        setChosenCarts((prev) => {
            return prev.map(cartItem =>
                cartItem.name === item.name
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            );
        });
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
                        <div key={index} className="div-card-wrapper col-4 mb-3 px-0">
                            <div className="card p-0 bg-transparent border border-0">
                                <div>
                                    <img src={`${el.image.desktop}`} alt={el.name} title={el.name} width={250} className="rounded-2"/>      
                                    {
                                        chosenCarts.find(arEl => arEl.name === el.name) ? 
                                        <div className="d-flex justify-content-center button-div-wrapper">
                                            <div className="button-div">
                                                <button onClick={() => handleRemoveCartClick(
                                                {
                                                    name: el.name,
                                                    quantity: 1,
                                                    price: el.price
                                                }
                                                )}>
                                                    <img src="/assets/images/icon-decrement-quantity.svg"/>
                                                </button>

                                                <p className="text-white m-0 fx-bold">{chosenCarts.find(arEl => arEl.name === el.name)?.quantity}</p>

                                                <button onClick={() => handleAddToCartClick(
                                                {
                                                    name: el.name,
                                                    quantity: 1,
                                                    price: el.price
                                                }
                                                )}>
                                                    <img src="/assets/images/icon-increment-quantity.svg"/>
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <button className="btn rounded-5 px-4 bg-white" onClick={() => handleAddToCartClick(
                                            {
                                                name: el.name,
                                                quantity: 1,
                                                price: el.price
                                            }
                                        )}>
                                            <img src="/assets/images/icon-add-to-cart.svg"/>Add to Cart
                                        </button>
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
