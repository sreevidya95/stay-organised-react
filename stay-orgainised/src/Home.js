
import Header from "./Header";
import { Option } from "./Option";
import CanvasJSReact from "@canvasjs/react-charts";
import Footer from "./Footer";
import { useEffect, useState,useRef,useReducer } from "react";
import { userGetData } from "./useGetData";
import {Link ,useParams} from "react-router-dom";
import OffCanvas from "./Offcanvas";
import { Tooltip } from "react-bootstrap";
export default function Home(){
  const[offcanvas,setoffcanvas]=useState(false);
  const initialState = {};
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
   
     var CanvasJSChart = CanvasJSReact.CanvasJSChart;
     const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Overview of How many tasks completed by all users"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 10,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: 18, label: "Direct" },
                { y: 49, label: "Organic Search" },
                { y: 9, label: "Paid Search" },
                { y: 5, label: "Referral" },
                { y: 19, label: "Social" }
            ]
        }]
    };
    const handleSearch = (search)=>{
          let t = todos.filter(d=>d.description.toLowerCase().includes(search));
           settodo(t);
           if(search.length===0||search===''){
             gettodos(useId.id)
        }
    }
   function gettodos(id){
    let todo =userGetData(`http://localhost:8083/api/todos/byuser/${id}`,"GET");
    todo
    .then(data=>{
       settodo(data);
   });
  }
  function handleOffcanvas(){
    setoffcanvas(false)
   }
    return(
        <>
         <Header handleSearch={handleSearch}/>
         <div className="container  data">
           <div className="row">
            <h2 className="h5 mt-2">👋 Hi, {localStorage.getItem('name') ? localStorage.getItem('name') : sessionStorage.getItem('name')} !!</h2>
           </div>
           <div className="row" style={{marginLeft:"-20px !important"}}>
                <div className="wrapper col-xl-6 col-md-6 rounded-4">
                  <div className="row mb-3" id="categories">
                  <Option url="http://localhost:8083/api/categories" type="card"/>
                  </div>
                </div>
                <div className="wrapper col-xl-5 rounded-4 col-md-5" id="list">
                <CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
                </div>
         </div>
         <div className="row" style={{marginLeft:"-20px !important"}}>
          { console.log(typeof todos)}
                <div className="wrapper col-xl-11 rounded-4 todo">
                 {todos.length===0 ? <h3 className="h3">seems , {user.current} doesnt have any tasks</h3>
                 : (
                  <>
                   <h6 className="text-center mt-5 mb-3 h5">{user.current ? `Tasks of  ${user.current}` : "Your Tasks"} </h6>
                   <table className="table table-hover table-striped">
                   <thead>
                    <tr>
                    <th ></th>
                    <th></th>
                    <th></th>
                    <Tooltip title="Add" placement="left">
            <h1>left</h1>
          </Tooltip>
                    <th>
                      <Link className="dropdown-toggle me-2 text-dark" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                    <i className="fa fa-filter fs-2"></i>
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown" id="navmenu">
                                    <div className="dropdown-item dropdown-toggle" to="#" data-bs-toggle="dropdown" data-bs-target="#priority">Sort By priority</div>
                                    <Link className="btn dropdown-item" to="#">Sort By Completed</Link>
                                    <Link className="btn dropdown-item" to="#">Sort By category</Link>
                                    </div>
                      </th>
                    </tr>
                   </thead>
                   <tbody>
                   {todos.map(e=> 
                      <>
                      <tr key={e.id} id={e.id} className="mt-5">
                        <td className={`${e.completed ? "text-success" : "text-dark"} text-center mt-3`}>{e.description}</td>
                        <td className={`${e.completed ? "text-success" : "text-dark"} text-center mt-3`}>complete By: {e.deadline}</td>
                        <td className="text-center mt-3"><i className="fa fa-info-circle" onClick={()=>dispatch({ type: "DETAILS_TODO", payload: e })}></i></td>
                        <td className="text-center mt-3"><i className="fa fa-edit" onClick={()=>dispatch({ type: "EDIT_TODO", payload: e })}></i></td>
                        <td className="text-center mt-3"><i className="fa fa-trash" onClick={()=>dispatch({ type: "DELETE_TODO", payload: e })}></i></td>
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
         </>
    );
}