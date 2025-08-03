import { useEffect, useState } from "react"

function List() {
    const [dataJson, setDataJson] = useState<any[]>([]);

    useEffect(() => {
        fetch("/data.json").then(response => response.json()).then(data => setDataJson(data));
    });

    return (
        <div className="d-flex flex-column">  
            <div>
                <h1 className="text-start h1-desserts">Desserts</h1>
            </div>
            <div className="container text-center">
                <div className="row align-items-start">
                    {dataJson.map(el =>
                        <div className="col-4 mb-3">
                            <div className="card p-0 bg-transparent border border-0">
                                <div>
                                    <img src={`${el.image.desktop}`} alt={el.name} width={200} className="rounded-2"/>
                                    <button className="btn rounded-5 border px-4 bg-white">
                                        <img src="/assets/images/icon-add-to-cart.svg"/>
                                        Add to Cart
                                    </button>
                                </div>
                                <div className="card-body text-start">
                                    <h2>{el.category}</h2>
                                    <h2>{el.name}</h2>
                                    <h2>${el.price}</h2>
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
