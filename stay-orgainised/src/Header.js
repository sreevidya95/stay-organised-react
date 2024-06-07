
import { NavLink ,useNavigate} from "react-router-dom";
import { Modal,Button } from "react-bootstrap";
import { useState} from "react";
import { Option } from "./Option";
export default function Header(){
   const[signout,setsignout]=useState(false);
   const[type,settype]=useState('');
   const navigate = useNavigate();
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
    return(
        <>
        <header>
            <div className="container-flid">
                <div className="row">
                <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLink">
                    <span className="navbar-toggler-icon"></span>
                </button>
               
                <div className="collapse navbar-collapse" id="navLink">
                
                        <ul className="nav flex-column col-9 ms-2" id="nav">
                            <li className="nav-item disabled">
                            <img className="col-2" src="./logo.webp" alt="no"/>
                             <span className="caveat-brush-regular col-5">Listopia</span>
                            </li>
                            <li className="nav-item col-5 ms-2 mt-5 text-center">
                                Apps
                            </li>
                            <li className="nav-item col-12  mb-5">
                                <hr/>
                            </li>
                            <li className="nav-item col-5 ms-2 text-center">
                            <NavLink className="nav-link text-dark" to="/home">
                            <i className="fa fa-home"></i> 
                            <span> Home</span>
                            </NavLink>
                            </li>
                            <li className="nav-item col-5 ms-2 text-center">
                                <NavLink to="/addtodo" class="nav-link text-dark">
                                <i className='fa fa-tasks'></i>
                                <span> New Task</span>
                                </NavLink>
                            </li>
                            <li className="nav-item col-5 ms-2 text-center">
                                <NavLink to="/signup" className="nav-link text-dark">
                                <i className='fa fa-user-plus'></i>
                                <span>Add User</span>
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown col-5 ms-2 text-center">
                                    <NavLink className="nav-link dropdown-toggle me-2 text-dark" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                        <i className='fa fa-users'></i>
                                        <span> All Users</span>
                                    </NavLink>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown" id="navmenu">
                                    <Option url="http://localhost:8083/api/categories"/>
                                    </div>
                            </li>
                        </ul>
                        </div>
                        <NavLink className="navbar-brand headLink col-9 rounded-4" to="#">
                            <h5 className="h5 col-2 ms-2 mt-3">Home</h5>
                            <input type="text" id="search" className="col-4 rounded-3" placeholder=" Search here for the required todos....&#x1F50D;"/>
                            <NavLink to="#userMenu" id="letter" className="col-1 offset-3 btn btn-success dropdown-toggle me-1" role="button" data-bs-toggle="dropdown">{(localStorage.getItem('name'))? localStorage.getItem('name').charAt(0):sessionStorage.getItem('name').charAt(0)}</NavLink>
                            <div className="dropdown-menu col-2 offset-12" id="userMenu">
                                <NavLink className="btn dropdown-item" onClick={out}>signOut</NavLink>
                                <NavLink className="btn dropdown-item">Upload profile picture</NavLink>
                                <NavLink className="btn dropdown-item">Delete Account</NavLink>
                            </div>
                            </NavLink>
                        </nav>

                </div>   
            </div>
        </header>
        <Modal
        show={signout}
        hide={!signout}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{(type==='signin') ? "Sign out" : "Delete"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {(type==='signin') ? "Are you sure you really want to signout" : "Are you sure you want to Delete your account"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setsignout(false)}}>
            Close
          </Button>
          <Button variant="primary" onClick={getSignout}>Proceed</Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}