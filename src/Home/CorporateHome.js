import { Link, Outlet } from "react-router-dom";

export default function CorporateHome(){

    return(
    <div>
             <div className="App">
      <div>
        
      </div>
      <nav className="navbar navbar-expand-sm bg-light mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            
            <li className="nav-item">
              <Link to="Home/sendrequest" className="nav-link px-3">Send Request</Link>
            </li>

            <li className="nav-item">
              <Link to="Home/viewresponse" className="nav-link px-3">View Response</Link>
            </li>
           
            <li className="nav-item">
              <Link to="/logout" className="nav-link px-3">Logout</Link>
            </li>
          </ul>
          
        </div>
      </nav>
            <h1>Corporate Page</h1>
        </div>
        <Outlet/>
        </div>
   
    )
}