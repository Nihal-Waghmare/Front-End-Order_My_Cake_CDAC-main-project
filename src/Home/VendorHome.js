import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function VendorHome(){

  const [vendor, setvendor]= useState(null);

  

    useEffect ( ()=>{
    const loginid=  JSON.parse(localStorage.getItem("loggedUser")).loginid;

         fetch("http://localhost:8080/getVendor?loginid="+ loginid)
         .then(resp => resp.json())
         .then(obj=>{ 
         localStorage.setItem("loggedVendor",JSON.stringify(obj))
               setvendor(obj);


         })

    },[])


    return(
    <div>
             <div className="App">
      <div>
        
      </div>
      <nav className="navbar navbar-expand-sm bg-light mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="Home/viewcake" className="nav-link px-3">View Cakes</Link>
            </li>
            <li className="nav-item">
              <Link to="vieworders" className="nav-link px-3">View Orders</Link>
            </li>
            <li className="nav-item">
              <Link to="Home/addproduct" className="nav-link px-3">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link to="Home/viewrequest" className="nav-link px-3">View Request</Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link px-3">Logout</Link>
            </li>
          </ul>
          
        </div>
      </nav>
            <h1>Vendor Page</h1>
        </div>

        <h1> Welcome { vendor && vendor.shopname}</h1>
        <Outlet/>
        </div>
   
    )
}