import Signup from './SIgnup';
import './App.css';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
function App() {
  const[signIn,setSignin]=useState(true);
  const[signup,setSignUp]=useState(false);
  return (
    <div className="App">
      <header>
      </header>
      <main>
        {signIn &&(<div className="container">
            <div className="row">
                 <div className="col-md-6 log">
                 <div className="row">
                 <h2 class="display-4 text-center mt-5 dancing-script">Welcome Back!!</h2>
                            <form className="form">
                            <div className="input-group col-8 offset-3 mt-4">
                                <span className="input-group-text border border-dark"><i className="fa fa-user"></i></span>
                                <input id="uEmail" type="text" className="form-control-sm" placeholder="Enter your User Name"/>
                                <div class="col-12 mt-1 mb-1" id="uError"></div>
                            </div>
                            <div class="input-group mt-4 col-8 offset-3">
                                <span className="input-group-text border border-dark"><i className="fa fa-lock"></i></span>
                                <input id="name" type="password" className="form-control-sm" placeholder="Enter your password"/>
                                <div id="pwdError" className="col-12 mt-2 mb-1"></div>
                            </div>
                            <div className="row mt-4">
                                <div className="form-check col-4 offset-3">
                                    <input type="checkbox" className="form-check-input border-dark" id="remMe"/>
                                    <label for="remMe" className="form-check-label">Remember ME</label>
                                </div>
                            </div>
                            <input type="button" className="btn rounded-5 mt-5 mb-5" value="Login" id="login"/>
                            </form>
                    </div>
                 </div>
                 <div className='col-md-6 bg'>
                    <div className="row  tranb">
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
            timeout={200}
            classNames={(!signup) ? 'tranb' : 'tranc'}
            onEntered={()=>setSignin(false)}
            onExited={()=>setSignin(true)}
        >
          <div className='container'>
          <div className='row' style={{height:"750px"}}>
          <div className='col-md-6 bg tranc'>
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
