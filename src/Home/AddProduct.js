

import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddProduct(){


    const init={
      productname:"",
      price:"",
      weight:"",
   //   image:"",
      eggeggless:"",
      description:"",
      cakeid : 0,
      flavorid:0,
      shapeid:0,
      vendorid:0
      }
    
      const reducer =(state,action)=>{
        switch(action.type){
          case 'update':
            return {...state, [action.fld]: action.val}
          case 'reset':
            return init;
        }
    
      }
      const [info,dispatch]= useReducer(reducer,init);
      const [allflavor, setAllflavor]= useState([]);
      const [allshape, setAllshape]= useState([]);
      const [allcaketype, setAllcaketype] = useState([]);
      const [file, setfile] = useState();
      const navigate = useNavigate();
      const reduxAction = useDispatch();


      const senddata=(e)=>{
        
        e.preventDefault();
        info.vendorid=JSON.parse(localStorage.getItem("loggedVendor")).vendorid;
         const reqOptions = {
        method : 'POST',
        headers : {'content-type':'application/json'},
        body: JSON.stringify(info)

      }
      fetch("http://localhost:8080/addProduct",reqOptions)
      .then(resp => {
          if(resp.ok){
             alert("added successfully");
              return resp.json();
      }
        else
          throw new Error("server error");

    })
    .then(obj => {
          const fd= new FormData();
          fd.append("file",file);

          const reqOptions1= {
            method : 'POST',
            
            body : fd
          }
        fetch("http://localhost:8080/uploadImage/"+obj.productid,reqOptions1)
        .then(resp => resp.json())
        .then( obj => {
           if(obj)
           {
            alert("Registration Successfull");
            navigate("Home/viewcake");
           }
           else
           {
            alert("Registration Successfull..Photo upload failed");
            navigate("/");
           }

        })
       

    })
    .catch((error) =>  alert("Server Error")  )    

      
      /* .then(resp => resp.json())
   
       .then(obj=> console.log(JSON.stringify(obj)))*/
      }

       useEffect(() => {
       
        fetch("http://localhost:8080/getAllFlavor")
        .then((resp) => resp.json())
        .then((f) => setAllflavor(f));
  
        fetch("http://localhost:8080/getAllShapes")
        .then((resp) => resp.json())
        .then((s) => setAllshape(s));
  
        fetch("http://localhost:8080/getAllCakeTypes")
        .then((resp) => resp.json())
        .then((c) => setAllcaketype(c));
  
        },[]);


    return(
        
        <div>
                <form>
     <div className="form-group">
       <label htmlFor="productname">Product Name:</label>
       <input type="text" className="form-control" id="productname" placeholder="Enter Product name" name="productname" value={info.productname.value} 
        onChange={(e)=>{dispatch({type:'update' , fld:'productname', val:e.target.value})}} />
       </div>

       <div className="form-group">
       <label htmlFor="price">Price:</label>
       <input type="number" className="form-control" id="price" placeholder="Enter Price " name="price" value={info.price.value} 
         onChange={(e)=>{dispatch({type:'update' , fld:'price', val:e.target.value})}} />
       </div>

       <div className="form-group">
       <label htmlFor="weight">Weight:</label>
       <input type="number" className="form-control" id="weight" placeholder="Enter Weight " name="weight" value={info.weight.value} 
        onChange={(e)=>{dispatch({type:'update' , fld:'weight', val:e.target.value})}} />
       </div>

    
       <div className="form-group">
       <label htmlFor="eggeggless">EggEggless:</label>
       <input type="text" className="form-control" id="eggeggless" placeholder="Enter eggeggless" name="eggeggless" value={info.eggeggless.value} 
        onChange={(e)=>{dispatch({type:'update' , fld:'eggeggless', val:e.target.value})}} />
       </div>
       <br/>
       
       <div className="form-group">
       <label htmlFor="cakeid"> Select Caketype</label>
       <select className="form-group" id="cakeid" name="cakeid"  onChange={(e)=>{dispatch({type:'update' , fld:'cakeid', val:e.target.value})}}>
        {           
           allcaketype.map(c => {
            return <option value={c.cakeid}> {c.caketype}</option>
          })
        }
       </select>
     </div>
     <br/>

     <div className="form-group">
       <label htmlFor="flavorid"> Select flavor</label>
       <select className="form-group" id="flavorid" name="flavorid"  onChange={(e)=>{dispatch({type:'update' , fld:'flavorid', val:e.target.value})}}>
        {
           allflavor.map(f => {
            return <option value={f.flavorid}> {f.flavor}</option>
          })
        }
       </select>
     
     </div>
     <br/>

     <div className="form-group">
       <label htmlFor="shapeid"> Select shape </label>
       <select className="form-group" id="shapeid" name="shapeid"  onChange={(e)=>{dispatch({type:'update' , fld:'shapeid', val:e.target.value})}}>
        {
           allshape.map(s => {
            return <option value={s.shapeid}> {s.shape}</option>
          })
        }
       </select>
       <div className="form-group">
       <label htmlFor="Image">Upload Image </label>
       <input type="file" className="form-control" id="image" placeholder="Upload Image" name="image" 
         onChange={(e)=> setfile(e.target.files[0])} />
       </div>
      
     </div>
     <br/>

       <div className="form-group">
       <label htmlFor="description">Description:</label>
       <textarea cols={3} rows={3} className="form-control" id="description" placeholder="Enter Description" name="description" value={info.description.value} 
         onChange={(e)=>{dispatch({type:'update' , fld:'description', val:e.target.value})}} />
       </div>
       
       
       <div className="checkbox">
       <label><input type="checkbox" name="remember"/> Remember me</label>
     </div>
     <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{senddata(e)}}>Submit</button>
     <button type="reset" className="btn btn-primary mb-3" onClick={()=>{dispatch({type:'reset'})}}>clear</button>
       
        </form>
        
        <p>{JSON.stringify(info)}</p>        

        </div>

    )
}