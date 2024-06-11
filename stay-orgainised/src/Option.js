import { Link } from "react-router-dom";
import { userGetData } from "./useGetData";
import { useEffect, useState } from "react";
export function Option(props) {
    const task = props.task;
    const url = props.url;
    const [cat, setcat] = useState([]);
    useEffect(() => {
        let c = userGetData(url, "get");
        c.then(e => {
            setcat(e);
        });
    }, [url]);

    return (
        <>
            {cat.map(e => props.type === 'card' ?
                (
                    <div className="col-md-6 col-xl-6" key={e.id}>
                        <div className="card mt-5 mb-2">
                            <div className="card-body">
                                <div className="card-title" style={{float:"right",marginTop:"-40px"}}>
                                   {task && e.name === "Personal Task" ? <i className="fa fa-user-circle-o fs-1 text-white bgcolor p-1"></i> : e.name === "Household Task" ?
                                        <i className="fa fa-home  fs-1 text-white bgcolor p-1" aria-hidden="true"></i> : e.name === "Financial Task" ? 
                                        <i className="fa fa-bank  fs-1  text-white bgcolor p-1" aria-hidden="true"></i> : e.name === "Help Others" ? 
                                        <i className="fa fa-handshake-o  fs-1 text-white bgcolor p-1"></i>:
                                            e.name === "Errand" ? <i className="fa fa-shopping-cart fs-1 text-white bgcolor p-1" aria-hidden="true"></i> : 
                                            <i className="fa fa-briefcase fs-1 text-white bgcolor p-1" aria-hidden="true"></i>}
                                </div>
                                <span className="badge bgcolor rounded-5" style={{ float: "left" }}>
                                    {task && e.name === "Personal Task" ? task.pt : e.name === "Household Task" ?
                                        task.ht : e.name === "Financial Task" ? task.ft : e.name === "Help Others" ? task.ho :
                                            e.name === "Errand" ? task.er : task.wt}
                                </span>
                                <h6 className="h6 text-center">{e.name}</h6>
                                {/* <span style={{float:"right"}}></span> */}
                            </div>
                        </div>
                    </div>
                )
                : (props.type === 'option' ?
                    <option
                        key={e.id}
                        id={e.id}
                        value={props.url.includes('categories') ? e.name : e.id}
                        selected={props.defaultValue === e.name}
                    >
                        {e.name}
                    </option> :
                    <li><Link className="btn dropdown-item" to={`/home/${e.id}/${e.name}`} key={e.id} id={e.id} value={e.id}>{e.name}</Link></li>
                ))
            }
        </>
    );
}