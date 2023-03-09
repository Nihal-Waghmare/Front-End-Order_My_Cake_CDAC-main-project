//import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginComp from './Components/LoginComp';
import CustomerHome from './Home/CustomerHome';
import { useSelector } from 'react-redux';
import LogoutComp from './Components/LogoutComp';
import VendorHome from './Home/VendorHome';
import VendorRegistration from './Registration/VendorRegistration';
import CustomerRegistration from './Registration/CustomerRegistration';
import CorporateRegistration from './Registration/CorporateRegistration';
import CorporateHome from './Home/CorporateHome';
import AdminHome from './Home/AdminHome';
import AddFlavor from './Home/AddFlavor';
import AddProduct from './Home/AddProduct';
import AddShape from './Home/AddShape';
import Flavor from './Home/Flavor';
import Vendor from './Home/Vendor';
import ApproveVendor from './Home/ApproveVendor';
import ViewCake from './Home/ViewCake';
import SendRequest from './Home/SendRequest';
import ViewRequest from './Home/ViewRequest';
import SendResponse from './Home/SendResponse';
import ViewResponse from './Home/ViewResponse';
import CustViewCake from './Home/CustViewCake';


function App() {

  const mystate = useSelector((state)=> state.logged)
  return (
    <div className="App">
      
        <h1 className="bg-primary text-white">Welcome To Order My Cake </h1>
        <div style={{display: mystate.loggedIn?"none":"block"}}>
      <nav className="navbar navbar-expand-sm bg-light mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link px-3">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="login" className="nav-link px-3">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="vendorregistration" className="nav-link px-3">Vendor Registeration</Link>
            </li>
            <li className="nav-item">
              <Link to="customerregistration" className="nav-link px-3">Customer Registeration</Link>
            </li>
            <li className="nav-item">
              <Link to="corporateregistration" className="nav-link px-3">Corporate Registeration</Link>
            </li>
          </ul>
        </div>
      </nav>
      </div>

      
      <Routes>

      <Route path="/login" element={<LoginComp/>}/>
      <Route path="/customer_home" element={<CustomerHome/>}>
        <Route path="Home/Flavor" element={<Flavor/>}/>
        <Route path="Home/Vendor" element={<Vendor/>}/>
        <Route path="Home/customerviewcake" element={<CustViewCake/>}/>
        
       </Route>

      <Route path="vendorregistration" element={<VendorRegistration/>}>
   

      </Route>
      <Route path="customerregistration" element={<CustomerRegistration/>}>
     
      </Route>
    

      <Route path="corporateregistration" element={<CorporateRegistration/>}/>

      <Route path="vendor_home" element={<VendorHome/>}>
          <Route path="Home/addproduct" element={<AddProduct/>}/>
          <Route path="Home/viewcake" element={<ViewCake/>}/>

          <Route path="Home/viewrequest" element={<ViewRequest/>}>
          <Route path="Home/sendresponse" element={<SendResponse/>}/>
          </Route>
       

      </Route>
    

      <Route path="corporate_home" element={<CorporateHome/>}>
          <Route path="Home/sendrequest" element={<SendRequest/>}/>
          <Route path="Home/viewresponse" element={<ViewResponse/>}/>
         
      </Route>

      <Route path="/admin_home" element={<AdminHome/>}>
            <Route path="Home/add_flavor" element={<AddFlavor/>}/>
            <Route path="Home/addshape" element={<AddShape/>}/>
            <Route path="Home/approvevendor" element={<ApproveVendor/>}/>
          
            
            </Route>
      <Route path="/logout" element={<LogoutComp/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
