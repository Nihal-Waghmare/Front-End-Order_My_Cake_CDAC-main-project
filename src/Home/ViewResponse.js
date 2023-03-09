import { useEffect, useState } from "react"


export default function ViewResponse(){


    const[response, getallresponse ]= useState([]);

    useEffect(() => {
       
        fetch("http://localhost:8080/getAllResponser")
        .then((resp) => resp.json())
        .then((r) => getallresponse(r));
    
       },[])





    return(
        <div>
        <table className="table" border={1}>
         <tbody>
         <tr>
          <td>   <h1> Number of Cakes</h1></td> 
          <td>  <h1> Total Price</h1>   </td> 
          <td>  <h1> Company Name</h1>   </td> 
 
         </tr>
     {
 
         response.map((r)=>{
 
           return(
 
      
       <tr>
       <td>  <h1>  {r.noofcakes}</h1>  </td>
       <td>  <h1>  {r.maxprice}</h1>    </td>
      {/* <td>  <h1>  {r.rvendorid.shopname}</h1>    </td> */ }
    <td>  <input type={"button"} value={"Approve"} /> </td>
             
           </tr> 
           )
 
 
       })
     }
     </tbody>
 
 </table>
 
   </div>

    )
}