
import Header from "./Header";
import { Option } from "./Option";
import CanvasJSReact from "@canvasjs/react-charts";
import Footer from "./Footer";
import { useEffect, useState,useRef,useReducer } from "react";
import { userGetData } from "./useGetData";
import {Link ,useParams} from "react-router-dom";
import OffCanvas from "./Offcanvas";
// import { Tooltip } from "react-bootstrap";
export default function Home(){
  const[loading,setloading]=useState(false);
  const[offcanvas,setoffcanvas]=useState(false);
  const initialState = {};
  let task = useRef({pt:0,ht:0,ft:0,er:0,ho:0,wt:0});
  let hi=useRef(0);
  let med=useRef(0);
  let low=useRef(0);
  let com=useRef(0);
 let notcom=useRef(0);
  var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var options;
function reducer(state, action) {
  setoffcanvas(true);
  switch (action.type) {
      case "EDIT_TODO":{
        return{
          ...state,
          todo:action.payload,
          edit:true,
          placement:"end"
        }
      }
    case "DELETE_TODO":{
      return{
        ...state,
        todo:action.payload,
        delete:true,
        placement:"top"
      }
    }
      
      
      case "DETAILS_TODO":
        return{
          ...state,
          todo:action.payload,
          edit:false,
          placement:"end"
        }
    default:
      return state;
  }
};
  const [state, dispatch] = useReducer(reducer, initialState);
  let id = useRef(0);
  if(localStorage.getItem('id')){
    id.current=localStorage.getItem('id');
  }
  else{
    id.current=sessionStorage.getItem('id');
  }
  let useId = useParams();
  const[todos,settodo]=useState([]);
  let user = useRef("");
  useEffect(()=>{
    if(useId.name){
     user.current = useId.name;
    }
     gettodos(useId.id);
  },[useId.id])
    const handleSearch = (search)=>{
          let t = todos.filter(d=>d.description.toLowerCase().includes(search));
           settodo(t);
           if(search.length===0||search===''){
             gettodos(useId.id)
        }
    }
   async function gettodos(id){
    setloading(true)
    hi.current=0;
    com.current=0;
    med.current=0;
    low.current=0;
  notcom.current=0;
  task.current.pt=0;
  task.current.ht=0;
  task.current.ft=0;
  task.current.ho=0;
  task.current.er=0;
  task.current.wt=0;
    let todo =await userGetData(`http://localhost:8083/api/todos/byuser/${id}`,"GET");
    todo.forEach(e=>{
      e.category==="Personal Task" ? task.current.pt++ : e.category==="Household Task" ? 
      task.current.ht++ : e.category==="Financial Task" ? task.current.ft++ : e.category==="Help Others" ? task.current.ho++ :
    e.category==="Errand" ? task.current.er++ : task.current.wt++;
       e.priority==="High" ? hi.current++ : e.priority==="Low" ? low.current++ : med.current++;
       e.completed===true ? com.current++ : notcom.current++;
      })
      settodo(todo);
      setloading(false);
  }
  function handleOffcanvas(){
    setoffcanvas(false)
   }
     options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
        text: "Overview"
    },
    data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 10,
        indexLabel: "{label} - {y}",
        dataPoints: [
            { y: hi.current, label: "High Priority" },
            { y: low.current, label: "Low Priority" },
            { y: med.current, label: "Medium Priority" },
            { y: com.current, label: "Completed Tasks" },
            { y: notcom.current, label: "Not Completed Tasks" }
        ]
    }]
};
   return(
        <>
        {loading ? (<div className="d-flex justify-content-center">
            <div className="spinner-border" style={{height:"100px",width:"100px",marginTop:"70px"}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>)
         :<div>
         <Header handleSearch={handleSearch}/>
         <div className="container  data">
           <div className="row">
            <h2 className="h5 mt-2">👋 Hi, {localStorage.getItem('name') ? localStorage.getItem('name') : sessionStorage.getItem('name')} !!</h2>
           </div>
           <div className="row" style={{marginLeft:"-20px !important"}}>
                <div className="wrapper col-xl-6 col-md-6 rounded-4">
                  <div className="row mb-3" id="categories">
                  <Option url="http://localhost:8083/api/categories" type="card" task={task.current}/>
                  </div>
                </div>
                <div className="wrapper col-xl-5 rounded-4 col-md-5" id="list">
                  {todos.length===0 ? "No tasks to show graph":
                   <div>
                   <CanvasJSChart options = {options}
                     /* onRef = {ref => this.chart = ref} */
                   />
                   </div>
				/* onRef={ref => this.chart = ref} */
			            }
                </div>
         </div>
         <div className="row" style={{marginLeft:"-20px !important"}}>
                <div className="wrapper col-xl-11 rounded-4 todo">
                 {todos.length===0 ? <h3 className="h3">seems like {user.current} doesnt have any tasks</h3>
                 : (
                  <>
                   <h6 className="text-center mt-5 mb-3 h5">{user.current ? `Tasks of  ${user.current}` : "Your Tasks"} </h6>
                   <table className="table table-hover table-striped">
                   <thead>
                    <tr>
                    <th></th>
                    <th ></th>
                    <th>
                    <div className="dropdown">
                        <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">
                        <i className="fa fa-filter fs-2"></i>
                        </button>
                        <ul className="dropdown-menu">
                                <li class="dropdown dropend">
                        <Link className="dropdown-item dropdown-toggle" to="#" id="multilevelDropdownMenu1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Multilevel Action 1</Link>
                        <ul className="dropdown-menu" aria-labelledby="multilevelDropdownMenu1">
                            <li><Link className="dropdown-item" to="#">Action</Link></li>
                            <li className="dropdown dropend">
                                <Link className="dropdown-item dropdown-toggle" to="#" id="multilevelDropdownMenu1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Multilevel Action 2</Link>
                                <ul className="dropdown-menu" aria-labelledby="multilevelDropdownMenu2">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </li>
                            <li><Link className="dropdown-item" to="#">Another action</Link></li>
                            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                        </ul>
                    </li>
                          <li><Link  className="text-dark text-decoration-none" to="#">Filter By Categories &raquo;</Link></li>
                          <li><Link className="text-dark text-decoration-none" to="#">Filter By Complete status &raquo;</Link></li>
                         <ul className=" dropdown-menu dropdown-submenu text-dark text-decoration-none">
                          <Link className="dropdown-item" to="#">Completed</Link>
                          <Link className="dropdow-item" to="#">Not Completed</Link>
                          </ul>
                        </ul>
                      </div>
                  </th>
                    </tr>
                   </thead>
                   <tbody>
                   {todos.map(e=>
                      <>
                      <tr key={e.id} id={e.id} className="mt-5">
                        <td className={`${e.completed ? "text-success" : e.priority==="High" ? "text-danger" : "text-dark"} text-center mt-3`}>{e.description}</td>
                        <td className={`${e.completed ? "text-success" : e.priority==="High" ? "text-danger" : "text-dark"} text-center mt-3`}>complete By: {e.deadline}</td>
                        <td className="text-center mt-3"><i className="fa fa-info-circle" onClick={()=>dispatch({ type: "DETAILS_TODO", payload: e })}></i>
                        <span className="text-center mt-3 ms-3 me-3"><i className="fa fa-edit" onClick={()=>dispatch({ type: "EDIT_TODO", payload: e })}></i></span>
                        <span className="text-center mt-3 me-3"><i className="fa fa-trash" onClick={()=>dispatch({ type: "DELETE_TODO", payload: e })}></i></span></td>
                      </tr>
                      </>
                      )}
                      </tbody>
                      </table>
                      </>
                      )}
                </div>
                  {offcanvas && <OffCanvas data={state} val={offcanvas} onClick={handleOffcanvas} id={useId.id} name={useId.name}/>}
         </div>
         <Footer/>
         </div>
         </div>
}
         </>
    );
}