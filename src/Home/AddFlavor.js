import { useEffect, useReducer, useState } from "react";

export default function  AddFlavor(){
  const init={
    flavor:""
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
  const [allflavor, getallflavor]= useState([]);


  const senddata=(e)=>{
    e.preventDefault();
     const reqOptions = {
    method : 'POST',
    headers : {'content-type':'application/json'},
    body: JSON.stringify(info)
  }

  fetch("http://localhost:8080/addFlavor",reqOptions)
  .then(resp => resp.json())

  .then(obj=> console.log(JSON.stringify(obj)))
   }
  

   useEffect(() => {
       
    fetch("http://localhost:8080/getAllFlavor")
    .then((resp) => resp.json())
    .then((f) => getallflavor(f));

   },[])




return(
  <div>
          <h1 > List of Flavors </h1>
          <br/>
      <ul>
           <div>
            {
               allflavor.map(f => {
                return <li> <h2>{f.flavor}</h2> </li> 
              })
            }
           </div>

      </ul>
        
      <form> 
      <div className="form-group">
       <label htmlFor="flavor"> Add flavor</label>
       <input type="text" className="form-control" id="flavor" placeholder="flavor" name="flavor" value={info.flavor} 
      onChange={(e)=>{dispatch({type:'update' , fld:'flavor', val:e.target.value})}} />
       </div>


     <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{senddata(e)}}>Add</button>
     <button type="reset" className="btn btn-primary mb-3" onClick={()=>{dispatch({type:'reset'})}}>clear</button>

     </form>   

  </div>


)


}

