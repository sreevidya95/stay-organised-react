import { Link } from "react-router-dom";
import { userGetData } from "./useGetData";
import { useEffect, useState } from "react";
export function Option(props){
    const [cat,setcat]=useState([]);
    useEffect(()=>{
        let c=userGetData(props.url,"get");
        c.then(e=>{
           setcat(e);
        });
    },[]);
   return(
    <>
    {cat.map(e=>props.type==='option' ? <option key={e.id} id={e.id} value={e.id}>{e.name}</option> :  <li><Link className="btn dropdown-item" to="#"  key={e.id} id={e.id} value={e.id}>{e.name}</Link></li>)}
    </>
   );
}