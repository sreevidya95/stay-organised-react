import { Offcanvas } from "react-bootstrap"
import { Option } from "./Option";
import { userGetData, userSetData } from "./useGetData";
import { useRef, useState } from "react";
import Toast from "./Toast";
export default function OffCanvas(props) {
  const [task, edittask] = useState(props.data.todo);
  const[toast,setToast]=useState(false);
  let error = useRef("");
  function deleteTodo(id) {
    let del = userGetData(`http://localhost:8083/api/todos/${id}`, "DELETE");
    del.then(data => {
      setToast(true);
    });
  }

  const editChange = (event) => {
    edittask({ ...task, [event.target.name]: event.target.value });
  }

  function submit() {
    if (task.description === '' || task.description === null) {
      error.current = " Task Description SHould not be empty";
    }
    else {
      if (task.completed === 'true') {
        task.completed = true;
      }
      else if (task.completed === 'false') {
        task.completed = false;
      }
      let d = userSetData(`http://localhost:8083/api/todos/${task.id}`, "put", task);
      d.then(data => {
        if (data === 200) {
          setToast(true);
        }
        else {
          alert("something went wrong");
        }
      })
    }
  }
  const closeToast=()=>{
    setToast(false);
    window.location.reload();
  }
  return (
    <>
      <Offcanvas show={props.val} onHide={!props.val} placement={props.data.placement}>
        <Offcanvas.Header>
          <Offcanvas.Title>{props.data.delete ? <h3 className="h3 text-center" style={{marginLeft:"600px"}}>Delete Task</h3> : <h3 className="h3">{props.data.edit === true ? "Edit Task" : "Details"} </h3>}</Offcanvas.Title>
          <span className="btn-close" style={{ float: "right !important" }} onClick={props.onClick}></span>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {(props.data.delete) &&
            (<div>
              <p className="text-center h3">{`Are you sure you want to delete the task  "${props.data.todo.description}" ?`}</p>
              <input type="button" className="btn  btn-primary col-3 offset-4 mt-4 mb-5 text-light" value="Delete Task" onClick={() => deleteTodo(props.data.todo.id)} />
            </div>)}
          {(props.data.edit === false) ? (
            <table id="details" className="col-sm-6 col-md-12" style={{ marginTop: "100px" }}>
              <tbody>
                <tr>
                  <th className="h3">category:</th>
                  <td className="h5">{props.data.todo.category}</td>
                </tr>
                <tr>
                  <th className="h3">Deadline:</th>
                  <td className="h5">{props.data.todo.deadline}</td>
                </tr>
                <tr>
                  <th className="h3">description:</th>
                  <td className="h5">{props.data.todo.description}</td>
                </tr>
                <tr>
                  <th className="h3">priority:</th>
                  <td className="h5">{props.data.todo.priority}</td>
                </tr>
                <tr>
                  <th className="h3">completed:</th>
                  <td className="h5">{props.data.todo.completed === true ? <i className="fa fa-check-circle"></i> : <i className="fa fa-times-circle"></i>}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <form id="form" className="form col-md-12 col-sm-6">
              <div className="col-12 box wi">
                <select className="form-select-sm col-8 offset-2" id="cat" value={task.category}  name="category" onChange={editChange}>
                  <Option url="http://localhost:8083/api/categories" type="option" defaultValue={task.category}/>
                </select>
                <input type="text" class="form-control-sm col-8 offset-2 mt-3 border border-secondary" name="description" id="todoData" placeholder="Enter your task" style={{ marginTop: "-30px !important" }} value={task.description} onChange={editChange} />
                <input id="deadline" class="form-control-sm col-8 offset-2 mt-3 border border-secondary" type="date" placeholder=" Enter Deadline" value={task.deadline} name="deadline" onChange={editChange} />
                <select class="form-select-sm col-8 offset-2 mt-3  border border-secondary" id="priority" placeholder="select priority" value={task.priority} name="priority" onChange={editChange}>
                  <option id="low" value="Low">Low</option>
                  <option id="medium" value="Medium">Medium</option>
                  <option id="high" value="High">High</option>
                </select>
                <select class="form-select-sm col-8 offset-2 mt-3 border border-secondary" id="completed" value={task.completed} name="completed" onChange={editChange}>
                  <option id="low" value={true}>Task completed</option>
                  <option id="medium" value={false}>Task Not completed</option>
                </select>
                <input type="button" class="btn  btn-primary col-6 offset-3 mt-4 mb-5 text-light" id="UpdateTodo" value="update Task" onClick={submit} />
              </div>
            </form>)}
        </Offcanvas.Body>
      </Offcanvas>
      <Toast value={toast} close={closeToast} message={props.data.delete ? "Task Deleted successfully" : "Task Edited Successfully"}/>
    </>
  );
}