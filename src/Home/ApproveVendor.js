import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ApproveVendor(){


  const [userinfo, setUserinfo]= useState([]);
  const navigate=  useNavigate();

  useEffect(()=> {


fetch("http://localhost:8080/getVendorApprovalChecklist")
.then((resp) => {

  if(resp.ok)
  {
    return resp.json();
  }

  else
  throw new Error ("Server Error");

})
.then((obj)=>{
  setUserinfo(obj);
  
}) 
.catch((error)=> alert("Server is down"));



},[]);

  const sendData=(e)=>{

    alert(e);
    fetch("http://localhost:8080/approve?vendorid="+e)
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
    alert("vendor approved");
    //navigate("Home/approvendor");
  }

  else{

    alert("Vendor not approved");
  }

    })
    .catch((error)=> alert("server down"));

  };

  return (
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Shopname</th>
        
          </tr>
        </thead>
        <tbody>
          {userinfo.map((v) => {
            return (
              <tr>
                <td>{v.shopname}</td>
              
                <td>
                  <button
                    onClick={() => {
                      sendData(v.vendorid);
                    }}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      );

}