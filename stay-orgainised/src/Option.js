import { Link } from "react-router-dom";
import { userGetData } from "./useGetData";
import { useEffect, useState } from "react";
export function Option(props){
    let task = props.task;
    const [cat,setcat]=useState([]);
    useEffect(()=>{
        let c=userGetData(props.url,"get");
        c.then(e=>{
           setcat(e);
        });
    },[]);
return(
    <>
    {cat.map(e=>props.type==='card' ? 
        (
            <div className="col-md-6 col-xl-6" key={e.id}>
                <div className="card mt-3 mb-3">
                <div className="card-body">
                    <span className="badge bg-secondary rounded-5" style={{float:"left"}}>
                          {task && e.name==="Personal Task" ? task.pt : e.name==="Household Task" ? 
                            task.ht : e.name==="Financial Task" ? task.ft : e.name==="Help Others" ? task.ho :
                            e.name==="Errand" ? task.er : task.wt}
                    </span>
                    <h6 className="h6 text-center">{e.name}</h6>
                    {/* <span style={{float:"right"}}></span> */}
                </div>
                </div>
                </div>
        )
       : (props.type==='option' ? <option key={e.id} id={e.id} value={props.url.includes('categories') ? e.name : e.id }>{e.name}</option> :  <li><Link className="btn dropdown-item" to={`/home/${e.id}/${e.name}`}  key={e.id} id={e.id} value={e.id}>{e.name}</Link></li>))}
    </>
   );
}