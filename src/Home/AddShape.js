import { useEffect, useReducer, useState } from "react";

export default function AddShape(){
    const init={
        shape:""
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
      const [allshapes, getallshapes]= useState([]);
    
    
      const senddata=(e)=>{
        e.preventDefault();
         const reqOptions = {
        method : 'POST',
        headers : {'content-type':'application/json'},
        body: JSON.stringify(info)
      }
    
      fetch("http://localhost:8080/addShape",reqOptions)
      .then(resp => resp.json())
    
      .then(obj=> console.log(JSON.stringify(obj)))
       }
      
    
       useEffect(() => {
           
        fetch("http://localhost:8080/getAllShapes")
        .then((resp) => resp.json())
        .then((s) => getallshapes(s));
    
       },[])
    return(
      <div>
              <h1 > List of Shapes </h1>
              <br/>
              
            <table className="table" border={1}>
               <tbody>
                      <tr>
                      <th><h3> Sr no.</h3></th>
                      <th> <h3>Shape</h3> </th>
                     </tr>
                     {
                   allshapes.map(s => {
                    return(
                    <tr>
                    <td><h3>{s.shapeid}</h3></td>
                   <td ><h3>{s.shape}</h3></td>
                   </tr>)
                
                })
                   }
                   </tbody>
            </table>
      
            
          <form> 
          <div className="form-group">
           <label htmlFor="shape"> Add Shape</label>
           <input type="text" className="form-control" id="shape" placeholder="shape" name="shape" value={info.shape.value} 
          onChange={(e)=>{dispatch({type:'update' , fld:'shape', val:e.target.value})}} />
           </div>
    
    <br/>
         <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{senddata(e)}}>Add Shape</button>
         <button type="reset" className="btn btn-primary mb-3" onClick={()=>{dispatch({type:'reset'})}}>clear</button>
    
         </form>   
    
      </div>
    
    
    )
    
}