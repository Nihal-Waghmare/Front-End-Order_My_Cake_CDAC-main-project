


import { Link, Outlet } from "react-router-dom";



export default function CustomerHome(){



    return(
      <div>
      <div className="App">

<nav className="navbar navbar-expand-sm bg-light mb-3">
 <div className="container-fluid">
   <ul className="navbar-nav">
     <li className="nav-item">
       <Link to="Home/customerviewcake" className="nav-link px-3">View Cakes</Link>
     </li>
     <li className="nav-item">
       <Link to="login" className="nav-link px-3">about</Link>
     </li>
     <li className="nav-item">
       <Link to="Home/Flavor" className="nav-link px-3">Flavor</Link>
     </li>

     <li className="nav-item">
       <Link to="Home/Vendor" className="nav-link px-3">Vendor</Link>
     </li>

     <li className="nav-item">
       <Link to="/logout" className="nav-link px-3">Logout</Link>
     </li>
   </ul>
   
 </div>
 
</nav>

 </div>
 <div>
    
            


 </div>




 <Outlet/>
 </div>

  )}

 
   


