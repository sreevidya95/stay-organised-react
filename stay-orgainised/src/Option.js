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
    {cat.map(e=><option key={e.id} id={e.id} value={e.id}>{e.name}</option>)}
    </>
   );
}