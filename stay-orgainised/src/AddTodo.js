import { useRef, useState } from "react";
import Alert from "./Alert";
import { Link, useNavigate } from "react-router-dom";
import { Option } from "./Option";
import { userSetData } from "./useGetData";
export default function AddTodo() {
    const [input, setinput] = useState({ userid: "", category: "", description: "", deadline: "", priority: "" });
    const [error, seterror] = useState({});
    const [load, setload] = useState(false);
    const [alert, setalert] = useState(false);
    const navigate = useNavigate();
    let id = useRef(0);
    if (localStorage.getItem('id')) {
        id.current = localStorage.getItem('id');
    }
    else {
        id.current = sessionStorage.getItem('id');
    }
    function handleChange(e) {
        setinput({ ...input, [e.target.name]: e.target.value });
    }
    function handleSubmit() {
        let errors = handleerror(input);
        seterror(errors);
        if (Object.keys(errors).length === 0) {
            setload(true);
            let c = userSetData('http://localhost:8083/api/todos', "POST", input);
            c.then(e => {
                setalert(true);
                setload(false);
            })
        }
    }
    function handleerror(input) {
        let errors = {};
        if (input.category === null || input.category === '') {
            errors.cat = "Select Categeory of the task";
        }
        if (input.description === null || input.description === '') {
            errors.todo = "Write Task Description";
        }
        if (input.deadline === null || input.deadline === "") {
            errors.deadline = "Enter Deadline date";
        }
        if (input.priority === null || input.priority === "") {
            errors.priority = "Select the priority"
        }
        if (input.userid === null || input.userid === '') {
            errors.assign = "Select the user to whom You want to assign the task";
        }
        return errors;
    }
    function handleAlert() {
        setalert(false);
        navigate(`/home/${id.current}`);

    }
    return (
        <>
            <header></header>
            <main id="main">
                <div className="container mt-5 contDim">
                    <div className="row box">
                        {load && (<div className="d-flex justify-content-center">
                            <div className="spinner-border" style={{ height: "100px", width: "100px", marginTop: "70px" }} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>)}
                        {alert && (<Alert onClick={handleAlert} val={false} />)}
                        <img src="./todo.png" alt="no" className="img1 mt-5" />
                        <form className="form" style={{ marginTop: "-50px" }}>
                            <select className={`${error.cat && 'border border-danger'} form-select-sm col-8 offset-2`} id="cat" name="category" onChange={handleChange} defaultValue={null}>
                                <option className="text-secondary" value="null">Select Categeory</option>
                                <Option url="http://localhost:8083/api/categories" type="option" />
                            </select>
                            {error.cat && <div className="col-8 offset-2 text-danger">{error.cat}</div>}
                            <textarea className={`${error.todo && 'border border-danger'} form-control-sm col-8 offset-2 mt-3 border border-secondary`} id="todoData" name="description" onChange={handleChange} placeholder="Enter your task"></textarea>
                            {error.todo && <div id="taskError" className="col-8 offset-2 text-danger">{error.todo}</div>}
                            <input id="deadline" name="deadline" className={`${error.deadline && 'border border-danger'} form-control-sm col-8 offset-2 mt-3 border border-secondary`} type="text" placeholder=" Enter Deadline" onFocus={(e) => e.target.type = "date"} onChange={handleChange} />
                            {error.deadline && <div id="deadlineError" className="col-8 offset-2 text-danger">{error.deadline}</div>}
                            <select className={`${error.priority && 'border border-danger'} form-select-sm col-8 offset-2 mt-3`} id="priority" defaultValue={null} name="priority" onChange={handleChange}>
                                <option value={null} className="sel">Select Priority</option>
                                <option id="low" value="Low">Low</option>
                                <option id="medium" value="Medium">Medium</option>
                                <option id="high" value="High">High</option>
                            </select>
                            {error.priority && <div id="prioError" className="col-8 offset-2 text-danger">{error.priority}</div>}
                            <select id="assign" className={`${error.assign && 'border border-danger'} col-8 offset-2 mt-3`} defaultValue={null} name="userid" onChange={handleChange}>
                                <option className="text-secondary" value={null}>Assign to</option>
                                <Option url="http://localhost:8083/api/users" type="option" />
                            </select>
                            {error.assign && <div id="assignError" className="col-8 offset-2 text-danger">{error.assign}</div>}
                            <input type="button" className="btn col-6 offset-3 mt-4 mb-5 text-light" id="signUp" value="Add Task" onClick={handleSubmit} />
                            <div className="col-8 offset-2 mb-3">Don't Want to add a task? <Link to="/home">Go to Home</Link></div>
                        </form>
                    </div>
                </div>
            </main>
            <footer></footer>
        </>
    );
}