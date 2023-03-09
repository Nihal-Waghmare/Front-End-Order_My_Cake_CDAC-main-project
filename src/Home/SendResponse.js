import { useReducer } from "react";



export default function SendResponse(){


    const init={
        totalprice:"",
        reqid:0,
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
    
      
      
        const senddata=(e)=>{
          info.reqid=JSON.parse(localStorage.getItem("reqid"));
          info.vendorid= JSON.parse(localStorage.getItem("loggedUser")).loginid;
          e.preventDefault();
           const reqOptions = {
          method : 'POST',
          headers : {'content-type':'application/json'},
          body: JSON.stringify(info)
        }
         console.log(info);
        fetch("http://localhost:8080/sendResponse",reqOptions)
        .then(resp => resp.json())
        .then(obj=> console.log(JSON.stringify(obj)))

         }

    return(
        <div>
        <form> 
      
               <div className="form-group">
               <label htmlFor="totalprice"> Enter Max Price</label>
               <input type="number" className="form-control" id="totalprice" placeholder="totalprice" name="totalprice" value={info.totalprice.value} 
              onChange={(e)=>{dispatch({type:'update' , fld:'totalprice', val:e.target.value})}} />
               </div>
        <br/>
        
        
        
             <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{senddata(e)}}> Send Response </button>
             <button type="reset" className="btn btn-primary mb-3" onClick={()=>{dispatch({type:'reset'})}}>clear</button>
        
             </form>   
             <p>{JSON.stringify(info)}</p>   
        
        </div>
        
        )


}