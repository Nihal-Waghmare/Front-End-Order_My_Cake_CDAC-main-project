import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function CorporateRegistration() {

  const init = {
    companyname: { value: "", error: "", valid: false, touched: false, },
    regno: { value: "", error: "", valid: false, touched: false },
    contactno: { value: "", error: "", valid: false, touched: false },
    areaid: 0,
    city: 0,
    addressline: { value: "", error: "", valid: false, touched: false },
    email: { value: "", error: "", valid: false, touched: false },
    password: { value: "", error: "", valid: false, touched: false },
    securityid: 0,
    ans: { value: "", error: "", valid: false, touched: false }
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'sp_update':
        return { ...state, [action.fld]: action.val }
      case 'update':
        return { ...state, [action.fld]: { ...state[action.fld], value: action.value, error: action.error, valid: action.valid, touched: action.touched } }
      case 'reset':
        return init;
    }

  }
  const [info, dispatch] = useReducer(reducer, init);
  const [allarea, setAllarea] = useState([]);
  const [allcities, setAllcities] = useState([]);
  const [allques, setAllques] = useState([]);
  const navigate = useNavigate();
  const reduxAction = useDispatch();


  const validate = (nm, val) => {
    let error = "";
    let valid = false;
    let touched = true;
    switch (nm) {
      case 'email':
        const exp1 = /^[a-z0-9]{3,}@[a-z]{3,12}\.[a-z]{2,}$/

        if (!exp1.test(val)) {
          error = "Invalid Email";
        }
        else {
          error = "";
          valid = true;
        }
        break;

      case 'password':
        const exp2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!exp2.test(val)) {
          error = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
        }
        else {
          error = "";
          valid = true;
        }
        break;

      case 'companyname':
        const exp3 = /^[A-Za-z]{3,}$/
        if (!exp3.test(val)) {
          error = "Atleast 3 Charaters";
        }
        else {
          error = "";
          valid = true;
        }
        break;

      case 'regno':
        const exp4 = /^[\w]{3,}$/
        if (!exp4.test(val)) {
          error = "Invalid";
        }
        else {
          error = "";
          valid = true;
        }
        break;

      case 'contactno':
        const exp5 = /^[0-9]{10}$/
        if (!exp5.test(val)) {
          error = "Invalid Contact Number";
        }
        else {
          error = "";
          valid = true;
        }
        break;

      case 'addressline':
        const exp7 = /[\w]{4,}$/
        if (!exp7.test(val)) {
          error = "Invalid";
        }
        else {
          error = "";
          valid = true;
        }
        break;

      case 'ans':
        const exp8 = /[\w]{3,}$/
        if (!exp8.test(val)) {
          error = "Invalid";
        }
        else {
          error = "";
          valid = true;
        }
        break;

    }

    console.log(val + "," + error + "," + valid)
    dispatch({ type: 'update', fld: nm, value: val, error, valid, touched })
  }

  const senddata = (e) => {

    e.preventDefault();
    const reqOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        companyname: info.companyname.value, regno: info.regno.value, email: info.email.value,
        password: info.password.value, areaid: info.areaid, securityid: info.securityid, contactno: info.contactno.value,
        addressline: info.addressline.value, ans: info.ans.value
      })

    }
    fetch("http://localhost:8080/regCorporateCustomer", reqOptions)

      .then(resp => {
        if (resp.ok)
          return resp.json();
        else
          throw new Error("server error");

      })
      .then(obj => {
        alert("Registration Successfull");
        navigate("/");

      })
      .catch((error) => alert("Server Error"))

    /*
    .then(resp => resp.json())
 
    .then(obj=> console.log(JSON.stringify(obj)))*/
  }

  const getAreas = (id) => {
    fetch("http://localhost:8080/getAllAreasFromCity?cityid=" + id)
      .then((resp) => resp.json())
      .then((a) => setAllarea(a));
  }


  useEffect(() => {

    fetch("http://localhost:8080/getAllAreas")
      .then((resp) => resp.json())
      .then((a) => setAllarea(a));

    fetch("http://localhost:8080/getAllCities")
      .then((resp) => resp.json())
      .then((c) => setAllcities(c));

    fetch("http://localhost:8080/getQuestion")
      .then((resp) => resp.json())
      .then((q) => setAllques(q));

  }, []);



  return (
    <div className="Const">
    
    <div className="Auth-form-container">


      <form className="Auth-form" >
        <div className="Auth-form-content">
        <br /><br />
          <h3 className="Auth-form-title">Corporate Customer Registration</h3>
          
          <label htmlFor="companyname">Company Name:</label>
          <input
            type="text"
            className="form-control"
            id="companyname"
            placeholder="Enter company name"
            name="companyname"
            value={info.companyname.value}
            onChange={(e) => { validate("companyname", e.target.value) }} />
            
          <div id="emailHelp" className="form-text" style={{ display: (!info.companyname.valid && info.companyname.touched) ? "block" : "none" }}>
            {info.companyname.error}
          </div>


          <div className="form-group">
            <label htmlFor="regno"> Company Registration Number:</label>
            <input type="text" className="form-control" id="regno" placeholder="Enter registration Number" name="regno" value={info.regno.value}
              onChange={(e) => { validate("regno", e.target.value) }} />
            <div id="emailHelp" className="form-text" style={{ display: (!info.regno.valid && info.regno.touched) ? "block" : "none" }}>
              {info.regno.error}
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="email">Email:</label>
          </div>
          <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={info.email.value}
            onChange={(e) => { validate("email", e.target.value) }} required />
             <div id="emailHelp" className="form-text" style={{ display: (!info.email.valid && info.email.touched) ? "block" : "none" }}>
              {info.email.error}
            </div>
           
           <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" value={info.password.value}
              onChange={(e) => { validate("password", e.target.value) }} />

            <p id="emailHelp" className="form-text" style={{ display: (!info.password.valid && info.password.touched) ? "block" : "none" }}>
              {info.password.error}

            </p>
          </div>

          <div className="form-group">
            <label htmlFor="contactno">Contact No.:</label>
            <input type="text" className="form-control" id="contactno" placeholder="Enter  Contact number" name="contactno" value={info.contactno.value}
              onChange={(e) => { validate("contactno", e.target.value) }} />
            <div id="emailHelp" className="form-text" style={{ display: (!info.contactno.valid && info.contactno.touched) ? "block" : "none" }}>
              {info.contactno.error}
            </div>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="city"> Select City</label>
            <select className="form-group" id="city" name="city" onChange={(e) => { getAreas(e.target.value); dispatch({ type: 'sp_update', fld: 'city', val: e.target.value }) }}>
              {
                allcities.map(c => {
                  return <option value={c.cityid}> {c.cityname}</option>
                })
              }
            </select>
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="areaid"> Select Area</label>
            <select className="form-group" id="areaid" name="areaid" onChange={(e) => { dispatch({ type: 'sp_update', fld: 'areaid', val: e.target.value }) }}>
              {
                allarea.map(a => {
                  return <option value={a.areaid}> {a.areaname}</option>
                })
              }
            </select>


          </div>
          <br />
          <div className="form-group">
            <label htmlFor="addressline"> Address:</label>
            <input type="text" className="form-control" id="addressline" placeholder="Enter Address" name="addressline" value={info.addressline.value}
              onChange={(e) => { validate("addressline", e.target.value) }} />
            <div id="emailHelp" className="form-text" style={{ display: (!info.addressline.valid && info.addressline.touched) ? "block" : "none" }}>
              {info.addressline.error}
            </div>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="securityid"> Select Security Question</label>
            <select className="form-group" id="securityid" name="securityid" onChange={(e) => { dispatch({ type: 'sp_update', fld: 'securityid', val: e.target.value }) }}>
              {
                allques.map(q => {
                  return <option value={q.queid}> {q.squestion}</option>
                })
              }
            </select>
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="ans"> Answer</label>
            <input type="text" className="form-control" id="ans" placeholder="Enter Answer" name="ans" value={info.ans.value}
              onChange={(e) => { validate("ans", e.target.value) }} />
            <div id="emailHelp" className="form-text" style={{ display: (!info.ans.valid && info.ans.touched) ? "block" : "none" }}>
              {info.ans.error}
            </div>
          </div>


          <div className="checkbox">
            <label><input type="checkbox" name="remember" /> Remember me</label>
          </div>
          <button type="submit" className="btn btn-primary mb-3" onClick={(e) => { senddata(e) }}>Submit</button>
          <button type="reset" className="btn btn-primary mb-3" onClick={() => { dispatch({ type: 'reset' }) }}>clear</button>
        </div>
      </form>

              <div></div>
      <outlet/>


    </div>
    </div>

  )
}