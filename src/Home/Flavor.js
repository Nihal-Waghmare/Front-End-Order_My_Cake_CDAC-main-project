import { useEffect, useReducer, useState } from "react";

export default function Flavor() {


    const init = {
        flavor:0
  
  
      }
  
  
  
      const reducer = (state, action) => {
          switch (action.type) {
            case 'update':
              return { ...state, [action.fld]: action.val }
           
            case 'reset':
              return init;
          }
      
        }
        const [info, dispatch] = useReducer(reducer, init);
  
      const [allflavor, getAllFlavor] = useState([]);
      const [allproduct, getAllProduct] = useState([]);
  
  
      const senddata = (e) => {
          console.log(e.flavorid);
               
          fetch("http://localhost:8080/getProductsbyFlavor?flavorid="+e.flavorid)
          .then((resp) => resp.json())
            .then((p) => getAllProduct(p));
      
          }
         
  
      useEffect(() => {
  
          fetch("http://localhost:8080/getAllFlavor")
            .then((resp) => resp.json())
            .then((f) => getAllFlavor(f));
      
      
        }, []);
      
  
      return(
          <div>
            
            <div className="form-group">
              <label htmlFor="flavor"> Select flavor</label>
              <select className="form-group" id="flavor" name="flavor" onChange={(e) => {  dispatch({ type: 'update', fld: 'flavor', val: e.target.value }) }}>
                {
                  allflavor.map(f => {
                    return <option value={f.flavorid}> {f.flavor}</option>
                  })
                }
              </select>
            </div>
                    <br/>
               <div>
            <button type="submit" className="btn btn-primary mb-3" onClick={(e) => { senddata(e) }}>Search</button>
            </div>
  
            <div>
  
            {
                          allproduct.map(p => {
                              return (
                                  <div className="col-md-3 col-sm-6 col-xs-12 myCardElement">
                                      <div className="card">
                                          <div className="card-body text-center">
                                          {p.imageName && (<img src="cakeimage.jpeg" alt="product" className="img-fluid productImage"/>)}
                            <br></br>
                             Name:{p.productname}<br></br>
                             Price:{p.price}<br></br>
                             Weight:{p.weight}<br></br>
                             Description:{p.description}<br></br>
                             Shop Name:{p.shopname}<br></br>
                             <button>Add to Cart</button>
                                  
  
                                          </div>
                                          
                                      </div>
                                  </div>
                              )
  
                          })
                      }
                  {/*</tbody>
              </table>*/}
  
          </div>
  
          </div>
      )


}