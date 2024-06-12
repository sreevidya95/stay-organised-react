
import { NavLink ,useNavigate} from "react-router-dom";
import { Modal,Button } from "react-bootstrap";
import { useState,useRef} from "react";
import { Option } from "./Option";
import { Tooltip } from 'react-tooltip'
export default function Header(props){
   const[signout,setsignout]=useState(false);
   const[type,settype]=useState('');
   const[search,setsearch]=useState('');
   const navigate = useNavigate();
   let id = useRef();
   if(localStorage.getItem('id')){
    id.current=localStorage.getItem('id');
   }
   else{
    id.current=sessionStorage.getItem('id')
   }
   function getSignout(){
    if(type==='signin'){
        if(localStorage.getItem('id')){
            localStorage.removeItem('id');
            localStorage.removeItem("name");
            localStorage.removeItem('userName');
        }
        navigate("/");
    }
   }
   function out(){
     settype('signin');
     setsignout(true);
   }
   function del(){
    settype('delete');
    setsignout(true);
  }
    return(
        <>
        <header>
            <div className="container-flid">
                <div className="row">
                <nav className="navbar navbar-expand-sm">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLink">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse  w3-animate-opacity" id="navLink">
                
                        <ul className="nav flex-column col-9 ms-2" id="nav">
                        <li className="nav-item col-6 mt-2 text-center h3 ps-3 caveat-brush-regular">
                                   ✅  <span className="colour fw-bold bg-white">Listopia</span>
                            </li>
                            <li className="nav-item col-5 ms-2 mt-5 text-center text-secondary">
                                Apps
                            </li>
                            <li className="nav-item col-12  mb-5">
                                <hr/>
                            </li>
                            <li className="nav-item col-12 ms-2">
                            <NavLink className="nav-link text-dark" to={`/home/${id.current}`}>
                            <i className="fa fa-home colour text-center fs-5"></i> 
                            <span className="ms-1 fs-5"> Home</span>
                            </NavLink>
                            </li>
                            <li className="nav-item col-12 ms-2">
                                <NavLink to="/addtodo" className="nav-link text-dark h4">
                                <i className='fa fa-tasks colour fs-5'></i>
                                <span className="ms-1 fs-5"> New Task</span>
                                </NavLink>
                            </li>
                            <li className="nav-item col-12 ms-2">
                                <NavLink to="/signup" className="nav-link text-dark h4">
                                <i className='fa fa-user-plus colour'></i>
                                <span className="ms-2 fs-5">Add User</span>
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown col-12 ms-2">
                                    <NavLink className="nav-link dropdown-toggle me-2 text-dark h4" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                        <i className='fa fa-users colour'></i>
                                        <span className="ms-1 fs-5"> All Users</span>
                                    </NavLink>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown" id="navmenu">
                                    <Option url="http://localhost:8083/api/users" type="link"/>
                                    </div>
                            </li>
                        </ul>
                        </div>
                        <NavLink className="navbar-brand headLink col-9 rounded-4" to="#">
                            <h5 className="h4 col-2 ms-2 mt-3 fw-bold">Home</h5>
                            <input type="text" id="search" className="col-4 rounded-3 ms-2" placeholder=" Search for the tasks here....&#x1F50D;"  onChange={(e)=>props.handleSearch(e.target.value,"search")}/>
                            <NavLink to="#userMenu" id="letter" className="col-2 offset-3 dropdown-toggle me-1 text-dark mt-5 initial h4 bgcolor" role="button" data-bs-toggle="dropdown">
                              {(localStorage.getItem('name'))? localStorage.getItem('name').charAt(0):sessionStorage.getItem('name').charAt(0)}
                                </NavLink>
                            <div className="dropdown-menu col-2 offset-12" id="userMenu">
                                <NavLink className="btn dropdown-item bg-white text-dark text-center m" onClick={out}>Signout</NavLink>
                                <NavLink className="btn dropdown-item bg-white text-dark text-center m" onClick={del}>Delete Account</NavLink>
                            </div>
                            </NavLink>
                        </nav>
                        <Tooltip anchorSelect="#letter" place="left">
                                       settings
                                      </Tooltip>
                </div>   
            </div>
        </header>
        <Modal
        show={signout}
        hide={!signout}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-center">{(type==='signin') ? "Sign Out" : "Delete"}</Modal.Title>
          <span style={{float:"right"}} onClick={(()=>{setsignout(false)})} className="btn-close"></span>
        </Modal.Header>
        <Modal.Body>
        {(type==='signin') ? "Are you sure you really want to signout" : "Sorry, You dont have the permission to delete your account"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setsignout(false)}}>
            Close
          </Button>
          {type==='signin' && <Button variant="primary" onClick={getSignout}>Proceed</Button>}
        </Modal.Footer>
      </Modal>
        </>
    );
}