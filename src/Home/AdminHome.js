import { Link, Outlet } from "react-router-dom";

export default function AdminHome(){

    return(
        <div>
                 <div className="App">
       
          <nav className="navbar navbar-expand-sm bg-light mb-3">
            <div className="container-fluid">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="Home/approvevendor" className="nav-link px-3">approve Vendor</Link>
                </li>

                <li className="nav-item">
                  <Link to="Home/add_flavor" className="nav-link px-3">add flavor</Link>
                </li>
                <li className="nav-item">
              <Link to="Home/addshape" className="nav-link px-3">Add Shape</Link>
            </li>
                <li className="nav-item">
                  <Link to="Home/about" className="nav-link px-3">about</Link>
                </li>
                <li className="nav-item">
                  <Link to="/logout" className="nav-link px-3">Logout</Link>
                </li>
              </ul>
              
            </div>
          </nav>
                <h1>Admin Page</h1>

             
            </div>

            <Outlet/>
            </div>
       
        )
    }

