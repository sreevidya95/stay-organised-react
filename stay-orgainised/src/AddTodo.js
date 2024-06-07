import {useState } from "react";
import { Link } from "react-router-dom";
import { Option } from "./Option";
export default function AddTodo(){
    const[input,setinput]=useState({cat:"",todo:"",deadline:"",priority:"",assign:""});
    const[error,seterror]=useState({});
    function handleChange(e){
       setinput({...input,[e.target.name]:e.target.value});
    }
    function handleSubmit(){
        let errors = seterror(handleerror(input));
        console.log(errors);
    }
    function handleerror(input){
        let errors={};
        if(input.cat===null||input.cat===''){
            errors.cat="Select Categeory of the task";
        }
        if(input.todo===null||input.todo===''){
            errors.todo="Write Task Description";
        }
        if(input.deadline===null||input.deadline===""){
            errors.deadline="Enter Deadline date";
        }
        if(input.priority===null||input.priority===""){
            errors.priority="Select the priority"
        }
        if(input.assign===null||input.assign===''){
            errors.assign="Select the user to whom You want to assign the task";
        }
        return errors;
    }
    return(
        <>
        <header></header>
        <main id="main">
            <div className="container mt-5 contDim">
                <div className="row box">
                    <img src="./todo.png" alt="no" className="img1 mt-5"/>
                       <form className="form" style={{marginTop: "-50px"}}>
                        <select className={`${error.text && 'border border-danger'} form-select-sm col-8 offset-2`} id="cat" name="cat" onChange={handleChange} defaultValue={null}>
                            <option className="text-secondary" value="null">Select Categeory</option>
                            <Option url="http://localhost:8083/api/categories"/>
                        </select>
                        {error.cat && <div className="col-8 offset-2 text-danger">{error.cat}</div>}
                        <textarea className="form-control-sm col-8 offset-2 mt-3 border border-secondary" id="todoData" name="todo" onChange={handleChange} placeholder="Enter your task"></textarea>
                        {error.todo && <div id="taskError" className="col-8 offset-2 text-danger">{error.todo}</div>}
                        <input id="deadline" name="deadline" className="form-control-sm col-8 offset-2 mt-3 border border-secondary" type="text" placeholder=" Enter Deadline" onFocus={(e)=>e.target.type="date"} onChange={handleChange}/>
                        {error.deadline && <div id="deadlineError" className="col-8 offset-2 text-danger">{error.deadline}</div>}
                        <select className="form-select-sm col-8 offset-2 mt-3" id="priority" defaultValue={null} name="priority" onChange={handleChange}>
                            <option value={null} className="sel">Select Priority</option>
                            <option id="low" value="Low">Low</option>
                            <option id="medium" value="Medium">Medium</option>
                            <option id="high" value="High">High</option>
                         </select>
                         {error.priority && <div id="prioError" className="col-8 offset-2 text-danger">{error.priority}</div>}
                        <select id="assign" className="col-8 offset-2 mt-3" defaultValue={null} name="assign" onChange={handleChange}>
                            <option className="text-secondary" value={null}>Assign to</option>
                            <Option url="http://localhost:8083/api/users"/>
                        </select>
                        {error.assign && <div id="assignError" className="col-8 offset-2 text-danger">{error.assign}</div>}
                        <input type="button" className="btn col-6 offset-3 mt-4 mb-5 text-light" id="signUp" value="Add Task" onClick={handleSubmit}/>
                        <div className="col-8 offset-2 mb-3">Don't Want to add a task? <Link to="/home">GoTo Dashboard</Link></div>
                       </form>
                    </div>
            </div>
         </main>
            <footer></footer>
            </>
    );
}