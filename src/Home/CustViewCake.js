import { useEffect, useState } from "react";
//import {image} from ".src/Components/Home/image/cakeimage.jpeg";

export default function CustViewCake() {


    const [product, setProduct] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/getAllProducts")
            .then((resp) => resp.json())
            // .then(obj=> console.log(obj))
            .then((p) => setProduct(p));

    }, []);

    const loginid=  JSON.parse(localStorage.getItem("loggedUser")).loginid;

  /*  
   const addToCart = (product) =>{
  //  if(!loggedUser.resp){
    if(!loginid.resp){
        alert("Login First")
    }

    else{

        localStorage.setItem("product",JSON.stringify(product));
        console.log(product);


    }


*/

    return (
        <div>
            <h1 > Product </h1>
            <br />
            {/*
            <table className="table" border={1}>
                <tbody>
                    <tr>
                        <th><h3> Sr no.</h3></th>
                        <th> <h3>Product Name</h3> </th>
                        <th> <h3>Price</h3> </th>
                        <th> <h3>Weight</h3> </th>
                        <th> <h3>Description</h3> </th>
                        <th> <h3>Egg/eggless</h3> </th>
    </tr>*/}
                    {
                        product.map(p => {
                            return (
                                <div className="col-md-3 col-sm-6 col-xs-12 myCardElement">
                                    <div className="card">
                                        <div className="card-body text-center">
                                        {p.imageName && (<img src="cakeimage.jpeg" alt="product" className="img-fluid productImage"/>)}
                          <br></br>
                           Name:{p.productname}<br></br>
                           Price:{p.price}<br></br>
                           Weight:{p.weight}<br></br>
                           Description:{p.description}<br></br>
                           Shop Name:{p.shopname}<br></br>
                           <button>Add to Cart</button>
                                

                                        </div>
                                        
                                    </div>
                                </div>



                                /*
                                
                                 <tr>   
                                    <td><h3>{p.productid}</h3></td>
                                   <td><h3> {p.productname}</h3></td> 
                                   <td><h3>{p.price}</h3></td> 
                                   <td><h3>{p.weight}</h3></td> 
                                   <td><h3>{p.description}</h3></td> 
                                   <td><h3>{p.eggeggless}</h3></td> 
                                </tr> 
                            */
                            )

                        })
                    }
                /{/*</tbody>
            </table>*/}

        </div>
    )
        }