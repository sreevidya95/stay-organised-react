import Signup from './SIgnup';
import './App.css';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { userGetData } from './useGetData';
import { useNavigate } from 'react-router-dom';
function App() {
  const[signIn,setSignin]=useState(true);
  const[signup,setSignUp]=useState(false);
  const[data,setdata]=useState({uname:"",pwd:"",remme:false});
  const[error,seterrors]=useState({});
  const[loading,setloading]=useState(false);
  const[pwdreveal,setPwdreveal]=useState(false);
  let navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('name')!== undefined &&localStorage.getItem('name')!== null && localStorage.getItem('name')!== ""){
           navigate("/Home");  
    }
  },[]);
  function handleChange(e){
    if(e.target.checked){
      e.target.value=true
    }
    else if(e.target.name==='remme'){
      e.target.value=false;
    }
    setdata({...data,[e.target.name]:e.target.value});
  }
  function login(e){
    e.preventDefault();
    const newErrors = validateForm(data);
    seterrors(newErrors);
    if(Object.keys(newErrors).length===0){
      setloading(true);
      let users=userGetData('http://localhost:8083/api/users',"get");
      users.then(user=>{
        for (const [key, value] of Object.entries(user)) {
            if(value.username===data.uname && value.password===data.pwd){
              setloading(false);
              console.log(data.remme);
              if(data.remme){
                  localStorage.setItem("id",value.id);
                  localStorage.setItem("name",value.name);
                  localStorage.setItem('userName',value.username);
              }
              else{
                  sessionStorage.setItem("id",value.id);
                  sessionStorage.setItem("name",value.name);
                  sessionStorage.setItem('userName',value.username);
              }
              navigate("/home");
              break;
            }
            else{
              seterrors({...error,uname:"Invalid user name or password"});
            }
        }
      });
    }
  }
  function validateForm(formdata){
    const errors = {};
    if(formdata.uname===''){
       errors.uname="Enter User name";
    }
    if(formdata.pwd===''){
      errors.pwd="Enter Password";
    }
    return errors;
  }
  return (
    <div className="App">
      <header>
      </header>
      <main>
        {loading && (<div className="d-flex justify-content-center">
            <div className="spinner-border" style={{height:"100px",width:"100px",marginTop:"70px"}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>)}
         {signIn &&(<div className="container">
            <div className="row">
                 <div className="col-md-6 log w3-animate-right">
                 <div className="row">
                 <h2 class="display-4 text-center mt-5 dancing-script">Welcome Back!!</h2>
                            <form className="form" onSubmit={login}>
                            <div className="input-group col-8 offset-4 mt-5">
                                <span className="input-group-text border border-dark"><i className="fa fa-user"></i></span>
                                <input id="uEmail" type="text" className="form-control-sm" placeholder="Enter your User Name" name="uname" value={data.uname} onChange={handleChange}/>
                                {error.uname && <span className="text-danger col-md-12">{error.uname}</span>}
                            </div>
                            <div class="input-group mt-4 col-8 offset-4">
                                <span className="input-group-text border border-dark"><i className="fa fa-lock"></i></span>
                                <input id="name" name="pwd" value={data.pwd} onChange={handleChange} type={(pwdreveal)?"text":"password"} className="form-control-sm" placeholder="Enter your password"/>
                                {(pwdreveal)?<i className="fa fa-eye pwd pwd1" aria-hidden="true" onClick={()=>setPwdreveal(false)}></i>:<i className="fa fa-eye-slash pwd pwd1" aria-hidden="true" onClick={()=>setPwdreveal(true)}></i>}
                                {error.pwd && <span className="text-danger col-md-12">{error.pwd}</span>}
                            </div>
                            <div className="row mt-4">
                                <div className="form-check col-4 offset-4">
                                    <input type="checkbox" name="remme" value={data.remme} onChange={handleChange} className="form-check-input border-dark" id="remMe"/>
                                    <label className="form-check-label">Remember ME</label>
                                </div>
                            </div>
                            <input type="submit" className="btn rounded-5 mt-5 mb-5 offset-4 col-4" value="Login" id="login"/>
                            </form>
                    </div>
                 </div>
                 <div className='col-md-6 bg tranb w3-animate-left'>
                    <div className="row">
                    <img src="./logo.webp" className="col-3 img" alt="no"/>
                      <h1 className="caveat-brush-regular display-4 ac" id="title">Listopia</h1>
                      <p  className="cookie-regular mt-3"> Listopia helps you stay organized and productive through out the day</p>
                        <p className="col-6 offset-3 text-dark text-center fw-bold">Dont have an account?</p>
                        <button value="Sign Up" onClick={()=>setSignUp(true)} className='btn rounded-5 mt-1 col-4 offset-4 button text-light fw-bold'><span>SignUp</span></button>
                    </div>
                    </div>
            </div>
        </div>)}
        <CSSTransition
            in={signup}
            unmountOnExit
            appear
            timeout={1000}
            onEnter={()=>setSignin(false)}
            onExit={()=>setSignin(true)}
        >
          <div className='container'>
          <div className='row' style={{height:"750px"}}>
          <div className='col-md-6 bg tranc w3-animate-right'>
                 <div className="row">
                 <img src="./logo.webp" className="col-3 img" alt="no"/>
                    <h1 className="caveat-brush-regular display-4 ac" id="title">Listopia</h1>
                    <p  className="cookie-regular mt-3"> Listopia helps you stay organized and productive through out the day</p>
                      <p className="col-6 offset-3 text-dark text-center fw-bold">Already have an account?</p>
                      <button value="Sign Up" onClick={()=>setSignUp(false)} className='btn rounded-5 mt-1 col-4 offset-4 button text-light fw-bold'><span>Login</span></button>
                 </div>
                 </div>
                <Signup/>
          </div>
        </div>
        </CSSTransition>
      </main>
    </div>
  );
}

export default App;
