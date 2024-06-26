
import Header from "./Header";
import { Option } from "./Option";
import CanvasJSReact from "@canvasjs/react-charts";
import Footer from "./Footer";
import { useEffect, useState, useRef, useReducer } from "react";
import { userGetData } from "./useGetData";
import { Link, useParams } from "react-router-dom";
import OffCanvas from "./Offcanvas";
import { Tooltip } from 'react-tooltip'
import { Modal } from "react-bootstrap";
// import { Tooltip } from "react-bootstrap";
export default function Home() {
  const [loading, setloading] = useState(false);
  const [offcanvas, setoffcanvas] = useState(false);
  const [cat, setcat] = useState([]);
  const [clearFilter, setclearFilter] = useState(false);
  const initialState = {};
  let task = useRef({ pt: 0, ht: 0, ft: 0, er: 0, ho: 0, wt: 0 });
  let hi = useRef(0);
  let med = useRef(0);
  let low = useRef(0);
  let com = useRef(0);
  let notcom = useRef(0);
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  var options;
  function reducer(state, action) {
    setoffcanvas(true);
    switch (action.type) {
      case "EDIT_TODO": {
        return {
          ...state,
          todo: action.payload,
          edit: true,
          delete:false,
          placement: "end"
        }
      }
      case "DELETE_TODO": {
        return {
          ...state,
          todo: action.payload,
          delete: true,
          edit:false,
          placement: "top"
        }
      }

      case "DETAILS_TODO":
        return {
          ...state,
          todo: action.payload,
          edit: false,
          delete:false,
          placement: "end"
        }
      default:
        return state;
    }
  };
  
  const [state, dispatch] = useReducer(reducer, initialState);
  let id = useRef(0);
  if (localStorage.getItem('id')) {
    id.current = localStorage.getItem('id');
  }
  else {
    id.current = sessionStorage.getItem('id');
  }
  let useId = useParams();
  const [todos, settodo] = useState([]);
  let user = useRef("");
  useEffect(() => {
    if (useId.name) {
      user.current = useId.name;
    }
    let c = userGetData("http://localhost:8083/api/categories", "get");
    c.then(e => {
      setcat(e)
    });
    gettodos(useId.id);
  }, [useId.id])
  const handleSearch = (search, type) => {
    if (type === 'search') {
      let t = todos.filter(d => d.description.toLowerCase().includes(search));
      settodo(t);
      if (search.length === 0 || search === '') {
        gettodos(useId.id)
      }
    }
    else if (type === 'filter') {
      setclearFilter(true);
      let t = search === true ? todos.filter(d => d.completed === true) : todos.filter(d => d.completed === false);
      settodo(t);
    }
    else if (type === "priority") {
      setclearFilter(true);
      let t = todos.filter(d => d.priority === search);
      settodo(t);
    }
    else if (type === "cat") {
      setclearFilter(true);
      let t = todos.filter(d => d.category === search);
      settodo(t);
    }
  }
  async function gettodos(id) {
    setloading(true)
    hi.current = 0;
    com.current = 0;
    med.current = 0;
    low.current = 0;
    notcom.current = 0;
    task.current.pt = 0;
    task.current.ht = 0;
    task.current.ft = 0;
    task.current.ho = 0;
    task.current.er = 0;
    task.current.wt = 0;
    let todo = await userGetData(`http://localhost:8083/api/todos/byuser/${id}`, "GET");
    todo.forEach(e => {
      e.category === "Personal Task" ? task.current.pt++ : e.category === "Household Task" ?
        task.current.ht++ : e.category === "Financial Task" ? task.current.ft++ : e.category === "Help Others" ? task.current.ho++ :
          e.category === "Errand" ? task.current.er++ : task.current.wt++;
      e.priority === "High" ? hi.current++ : e.priority === "Low" ? low.current++ : med.current++;
      e.completed === true ? com.current++ : notcom.current++;
    })
    settodo(todo);
    setloading(false);
  }
  function reset() {
    setclearFilter(false);
    gettodos(useId.id)
  }
  function handleOffcanvas() {
    setoffcanvas(false)
  }
  options = {
    exportEnabled: true,
    animationEnabled: true,
    title:{
      text: "task overview",
      fontSize:20,
      fontWeight:"normal"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 10,
      indexLabel: "{label}-{y}",
      dataPoints: [
        { y: hi.current, label: "High Priority"},
        { y: low.current, label: "Low Priority"},
        { y: med.current, label: "Medium Priority"},
        { y: com.current, label: "Completed Tasks"},
        { y: notcom.current, label: "Not Completed Tasks"}
      ]
    }]
  };
  return (
    <>
      {loading ? (<div className="d-flex justify-content-center">
        <div className="spinner-border" style={{ height: "100px", width: "100px", marginTop: "70px" }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>)
        : <div className="homepagebg">
          <Header handleSearch={handleSearch} />
          <div className="container  data">
            <div className="row w3-animate-zoom">
              <h2 className="h4 mt-2 ms-1 col-10">👋 Hi, {localStorage.getItem('name') ? localStorage.getItem('name') : sessionStorage.getItem('name')} !!</h2>
            </div>
            <div className="row" style={{ marginLeft: "-20px !important" }}>
              <div className="wrapper col-xl-6 col-md-6  col-12 rounded-5">
              <h5 className="col-10 h6 fw-bold text-center mt-2">Number of tasks for each category</h5>
                <div className="row mb-3" id="categories">
                  <Option url="http://localhost:8083/api/categories" type="card" task={task.current} />
                </div>
              </div>
              <div className="wrapper col-xl-5 rounded-5 col-md-5 col-12 text-center" id="list">
                {todos.length === 0 ? "No tasks to show chart" :
                  <div>
                    <CanvasJSChart options={options}
                    /* onRef = {ref => this.chart = ref} */
                    />
                  </div>
                  /* onRef={ref => this.chart = ref} */
                }
              </div>
            </div>
            <div className="row" style={{ marginLeft: "-20px !important" }}>
              <div className="wrapper col-xl-11 col-12 rounded-5 todo">
                {todos.length === 0 ? <>
                       <h3 className="h3">seems like {user.current} doesnt have any tasks</h3>
                       {clearFilter && <Link className="btn dropdown-item me-2 text-info text-decoration-underline" to="#" onClick={() => reset()}>ClearFilter</Link>}
                       </>
                 
                  : (
                    <>
                      <h6 className="text-center mt-5 mb-3 h1 colour">{user.current ? `Tasks of  ${user.current}` : "Your Tasks"} </h6>
                      <table className="table table-hover table-striped w3-animate-top">
                        <thead>
                          <tr>
                            <th></th>
                            <th ></th>
                            <th>
                              {clearFilter && <Link className="btn dropdown-item me-2 text-info text-decoration-underline" to="#" onClick={() => reset()}>ClearFilter</Link>}
                              <div className="dropdown dropend">
                                <button type="button" className="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
                                    <Tooltip anchorSelect=".fa-filter" place="top">
                                        Filter tasks
                                      </Tooltip>
                                      <i className="fa fa-filter fs-2"></i>
                                </button>
                                <ul className="dropdown-menu">
                                  <li><h5 className="dropdown-header h4">Sort By Priority</h5></li>
                                  <li><Link className="btn dropdown-item" to="#" onClick={() => handleSearch("Low", "priority")}>Low</Link></li>
                                  <li><Link className="btn dropdown-item" to="#" onClick={() => handleSearch("Medium", "priority")}>Medium</Link></li>
                                  <li><Link className="btn dropdown-item" to="#" onClick={() => handleSearch("Medium", "priority")}>High</Link></li>
                                  <li><h5 className="dropdown-header h4">Sort By category</h5></li>
                                  {cat.map(e => <li><Link className="btn dropdown-item" to="#" onClick={() => handleSearch(e.name, "cat")}>{e.name}</Link></li>)}
                                  <li><h5 className="btn dropdown-header h4">Sort by task completion</h5></li>
                                  <li><Link className="btn dropdown-item" to="#" onClick={() => handleSearch(true, "filter")}>completed</Link></li>
                                  <li><Link className="btn dropdown-item" to="#" onClick={() => handleSearch(false, "filter")}>Not Completed</Link></li>
                                </ul>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {todos.map(e =>
                            <>
                              <tr key={e.id} id={e.id} className="mt-5 col-12">
                                <td className={`${e.completed ? "colg" : e.priority === "High" ? "text-danger" : "text-dark"} text-center mt-3`}>{e.description}</td>
                                <td className={`${e.completed ? "colg" : e.priority === "High" ? "text-danger" : "text-dark"} text-center mt-3`}>complete By: {e.deadline}</td>
                                <td className="text-center mt-3"><i className="fa fa-info-circle col-1" onClick={() => dispatch({ type: "DETAILS_TODO", payload: e })}></i>
                                  <span className="text-center mt-3 ms-3 me-3"><i className="fa fa-edit col-1" onClick={() => dispatch({ type: "EDIT_TODO", payload: e })}></i></span>
                                  <span className="text-center mt-3 me-3"><i className="fa fa-trash col-1" onClick={() => dispatch({ type: "DELETE_TODO", payload: e })}></i></span></td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                      <Tooltip anchorSelect=".fa-edit" place="top">
                                       Edit Task
                                      </Tooltip>
                      <Tooltip anchorSelect=".fa-trash" place="top">
                                       Delete Task
                                      </Tooltip>
                      <Tooltip anchorSelect=".fa-info-circle" place="top">
                                       Details
                                      </Tooltip>
                    </>
                  )}
              </div>
              {offcanvas && <OffCanvas data={state} val={offcanvas} onClick={handleOffcanvas} id={useId.id} name={useId.name} />}
            </div>
            <Footer />
          </div>
        </div>
      }
    </>
  );
}