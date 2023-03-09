import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function ViewCake(){

  const[product, getallProduct]= useState([]);
  const navigate=  useNavigate();
 

    useEffect ( ()=>{
    const loginid=  JSON.parse(localStorage.getItem("loggedUser")).loginid;


  console.log(loginid);

    fetch("http://localhost:8080/getProducts?pvendorid="+loginid)
    .then((resp) => resp.json())
    .then((p) => getallProduct(p));
    
    },[])


    const sendData=(e)=>{
   

        const reqOptions = {
          method: 'DELETE',
          headers: { 'content-type': 'application/json' }}
      

        alert(e);
        fetch("http://localhost:8080/deleteProduct?productid="+e, reqOptions)
        .then(resp=>{
    
            if(resp.ok)
            {
                return resp.json();
            }
    
            else
            throw new Error ("Server Error");
    
    
        })
        .then((obj)=>{
    
      if(obj==true)
      {
        alert("product delete");
        //navigate("Home/approvendor");
      }
    
      else{
    
        alert("product not delete");
      }
    
        })
       // .catch((error)=> alert("server down"));
    
      };










return(

    <div>
    <h1 > Product </h1>
    <br />

    <table className="table" border={1}>
        <tbody>

                    <tr>
                        <th><h3> Sr no.</h3></th>
                        <th> <h3>Product Name</h3> </th>
                        <th> <h3>Price</h3> </th>
                    </tr>
           
            {
                product.map(p => {
                    return (
                        
                         <tr>   
                            <td><h3>{p.productid}</h3></td>
                           <td><h3> {p.productname}</h3></td> 
                           <td><h3>{p.price}</h3></td> 
                           <td>  <input type={"button"} value={"Delete"} onClick={() => {sendData(p.productid)}} /> </td>
                        </tr>     
                    )

                })
            }
         </tbody>
    </table>

</div>

)



}