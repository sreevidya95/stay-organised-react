
import Header from "./Header";
import { Option } from "./Option";
import CanvasJSReact from "@canvasjs/react-charts";
import Footer from "./Footer";
import { useEffect, useState,useRef } from "react";
import { userGetData } from "./useGetData";
import {Link ,useParams} from "react-router-dom";
export default function Home(){
  let id;
  if(localStorage.getItem('id')){
    id=localStorage.getItem('id');
  }
  else{
    id=sessionStorage('id');
  }
  let useId = useParams();
  const[todos,settodo]=useState([]);
  let user = useRef("");
  useEffect(()=>{
    if(useId.name){
     user.current = useId.name;
    }
    gettodos(useId.id);
    console.log(todos);
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
   function gettodos(id){
    let todo =userGetData(`http://localhost:8083/api/todos/byuser/${id}`,"GET");
    todo
    .then(data=>{
      console.log(data)
       settodo(data);
   });
  }
  function edittodo(id){
    console.log("hi");
  }
    return(
        <>
         <Header/>
         <div className="container  data">
           <div className="row">
            <h2 className="h5 mt-2">Hi, {localStorage.getItem('name') ? localStorage.getItem('name') : sessionStorage.getItem('name')}. Find Your tasks below</h2>
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
                <div className="wrapper col-xl-11 rounded-4 todo">
                 {todos.length===0 ? <h3 className="h3">You dont have any records</h3>
                 : (
                  <>
                   <h6 className="text-center mt-5 mb-3 h5">{user.current ? `Tasks of  ${user.current}` : "Your Tasks"} </h6>
                   <table class="table table-hover table-striped">
                   <thead>
                    <tr>
                    <th ></th>
                    <th></th>
                    <th></th>
                    <th><li className="nav-item dropdown col-5 ms-2 text-center">
                                    <Link className="nav-link dropdown-toggle me-2 text-dark" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                    <i className="fa fa-filter"></i>
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown" id="navmenu">
                                    <li><Link className="btn dropdown-item" to="#">Sort By priority</Link></li>
                                    <li><Link className="btn dropdown-item" to="#">Sort By Completed</Link></li>
                                    <li><Link className="btn dropdown-item" to="#">Sort By category</Link></li>
                                    </div>
                            </li>
                      </th>
                    </tr>
                   </thead>
                   <tbody>
                   {todos.map(e=> 
                      <>
                      <tr key={e.id} id={e.id} className="mt-5">
                        <td className={`${e.completed ? "text-success" : "text-dark"} text-center mt-3`}>{e.description}</td>
                        <td className={`${e.completed ? "text-success" : "text-dark"} text-center mt-3`}>complete By: {e.deadline}</td>
                        <td className="text-center mt-3"><i className="fa fa-info-circle" onClick={edittodo(e.id,"details")}></i></td>
                        <td className="text-center mt-3"><i className="fa fa-edit" onClick={edittodo(e.id,"edit")}></i></td>
                      </tr>
                      </>
                      )}
                      </tbody>
                      </table>
                      </>
                      )}
                </div>
         </div>
         <Footer/>
         </div>
         </>
    );
}