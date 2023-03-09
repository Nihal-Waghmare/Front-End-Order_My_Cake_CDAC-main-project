import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./slice";
import "../LoginComp.css";

export default function LoginComp(){

  const init={
    email:{value:"",error:"",valid:false, touched:false},
    password:{value:"",error:"",valid:false, touched:false}
  }
  const reducer =(state,action)=>{
    switch(action.type){
      case 'update':
            return{...state ,  [action.fld]: {  ...state[action.fld],value: action.value, error: action.error, valid: action.valid, touched: action.touched}}
      case 'reset':
        return init;
    }

  }
  const [info,dispatch]= useReducer(reducer,init);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const reduxAction = useDispatch();

  
  const validate = (nm,val) => {
    let error = "";
    let valid = false;
    let touched = true;
    switch(nm)
    {
        case 'email' :
             const exp1 = /^[\w]{3,}@[\w]{3,12}\.[a-z]{2,}$/
             if(!exp1.test(val))
             {
                error = "Invalid Email";                    
             }
             else
             {
                error ="";
                valid = true;
             }
             break;

        case 'password':
          const exp2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          if(!exp2.test(val))
          {
             error = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";                    
          }
          else
          {
             error ="";
             valid = true;
          }
          break;    
    }
    console.log(val+","+error+","+valid)
    dispatch({type: 'update', fld: nm,value: val,error, valid, touched})
}

  const senddata =(e)=>{
    e.preventDefault();
    const reqOptions = {
      method : 'POST',
      headers : {'content-type':'application/json'},
      body: JSON.stringify({ email: info.email.value, password: info.password.value })
    }
    fetch("http://localhost:8080/chkLogin",reqOptions)
    .then(resp => {if(resp.ok){
                    console.log(resp.status)
                     return resp.text();

                  }               
                  else{
                    console.log(resp.statusText)
                  throw new Error("server error")
                   }})
    .then(text => text.length ? JSON.parse(text) : {})
    .then(obj => {
          if(Object.keys(obj).length === 0)
          {
            console.log(obj);
            setMsg("Wrong Email or password")
          }
          else{
            reduxAction(login())
            console.log("in else")
            localStorage.setItem("loggedUser",JSON.stringify(obj));

            if(obj.status === false){
              alert("Request has not been approved");  
            }
            else
            {
             
              if(obj.role_id.role_id === 1 )
              {
                    navigate("/customer_home");
              }
              else if(obj.role_id.role_id === 2)
              {
                navigate("/vendor_home");
              }
              else if(obj.role_id.role_id === 3){
                navigate("/corporate_home");
              }
              else if(obj.role_id.role_id === 2)
              {
                navigate("/vendor_home");
              }
              else if(obj.role_id.role_id === 4){
                navigate("/admin_home");
              }


            }
          }
    })
    .catch((error)=> alert("Server Error Try after some time"));
  }

    return(
      
<div className="Auth-form-container">
  <form className="Auth-form">
    <div className="Auth-form-content">
      <h3 className="Auth-form-title">Sign in</h3>
      <div className="form-group mt-3">
      <label>Email address</label>
      <input 
      type="email" 
      className="form-control" 
      id="email" 
      placeholder="Enter email" 
      name="email"    value={info.email.value} 
       onChange={(e)=>{validate("email", e.target.value)}}   />
      

      <div id="emailHelp" className="form-text" 
      style={{display: (!info.email.valid&&info.email.touched)?"block":"none"}}>
           {info.email.error}
       </div> 
       </div>
    


     <div className="form-group mt-3">
      <label>Password</label>
      <input 
      type="password" 
      className="form-control mt-1"
      id="password" 
      placeholder="Enter password" 
      name="password"  value={info.password.value}
       onChange={(e)=>{validate("password", e.target.value)}}   />
       <div id="emailHelp" className="form-text" 
       style={{display: (!info.password.valid&&info.password.touched)?"block":"none"}}>
           {info.password.error}
       </div>
    </div>


    <div className="checkbox">
      <label><input type="checkbox" name="remember"/> Remember me</label>
    </div>
    <div className="d-grid gap-2 mt-3">
    <button type="submit" className="btn btn-primary mb-3"
     onClick={(e)=>{senddata(e)}}>Submit</button>
    <button type="reset" className="btn btn-primary mb-3" 
    onClick={()=>{dispatch({type:'reset'})}}>clear</button>
  </div>  

  <p>{JSON.stringify(info)}</p>
      <p>{msg}</p>
</div>
</form>

<div></div>
      <outlet/>
</div>

  )
}