import { useReducer } from "react";


export default function SendRequest(){

    const init={
      noofcakes:0,
      weight:"",
      maxprice:"",
      rcorporateid:0


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
        info.rcorporateid=JSON.parse(localStorage.getItem("loggedUser")).loginid;
        e.preventDefault();
         const reqOptions = {
        method : 'POST',
        headers : {'content-type':'application/json'},
        body: JSON.stringify(info)
      }
    
      fetch("http://localhost:8080/sendRequest",reqOptions)
      .then(resp => resp.json())
    
    
      .then(obj=> console.log(JSON.stringify(obj)))
       }
    


return(
<div>
<form> 
   
<div className="form-group">
       <label htmlFor="noofcakes"> Enter Number of cakes</label>
       <input type="number" className="form-control" id="noofcakes" placeholder="noofcakes" name="noofcakes" value={info.noofcakes.value} 
      onChange={(e)=>{dispatch({type:'update' , fld:'noofcakes', val:e.target.value})}} />
       </div>

       <div className="form-group">
       <label htmlFor="weight"> Enter Weight</label>
       <input type="number" className="form-control" id="weight" placeholder="weight" name="weight" value={info.weight.value} 
      onChange={(e)=>{dispatch({type:'update' , fld:'weight', val:e.target.value})}} />
       </div>


       <div className="form-group">
       <label htmlFor="maxprice"> Enter Max Price</label>
       <input type="number" className="form-control" id="maxprice" placeholder="maxprice" name="maxprice" value={info.maxprice.value} 
      onChange={(e)=>{dispatch({type:'update' , fld:'maxprice', val:e.target.value})}} />
       </div>




     <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{senddata(e)}}> Send </button>
     <button type="reset" className="btn btn-primary mb-3" onClick={()=>{dispatch({type:'reset'})}}>clear</button>

     </form>   
     <p>{JSON.stringify(info)}</p>   

</div>

)

}