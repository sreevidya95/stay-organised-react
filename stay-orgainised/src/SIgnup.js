import { useState } from "react";
export default function Signup(){
    const [pwd, setPwd] = useState('');
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [respwd, setresPwd] = useState('');
  const [isRevealresPwd, setIsresRevealPwd] = useState(false);
    return(
    <div className='col-md-6 log'>
    <div className="row">
            <div className="col-12 topStyle">
                <img src="./register.webp" class="col-2 img" alt="no"/>
             </div>
        </div>
    <form className="form">
                <input type="text" className="col-6 form-control-sm text-center rounded-5 offset-3" id="rName" placeholder="Enter your Name" required/>
                <div id="unErr"></div>
                <input type="text" className=" col-6 form-control-sm mt-3 text-center rounded-5 offset-3" id="rUName" placeholder="Enter user name you want to use" required/>
                <div id="uuErr"></div>
                <input  className="col-6 form-control-sm mt-3 text-center rounded-5 offset-3" id="rUPwd" placeholder=" Enter password" 
                type={isRevealPwd ? "text" : "password"}
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                />
                {isRevealPwd?<i className="fa fa-eye pwd" aria-hidden="true" onClick={()=>setIsRevealPwd(false)}></i>:<i className="fa fa-eye-slash pwd" aria-hidden="true" onClick={()=>setIsRevealPwd(true)}></i>}
                <div id="upErr"></div>
                <input className="col-6 form-control-sm mt-3 text-center rounded-5 offset-3" id="rUcPwd" placeholder=" Confirm password" required
                type={isRevealresPwd ? "text" : "password"}
                value={respwd}
                onChange={e => setresPwd(e.target.value)}
                />
                 {isRevealresPwd?<i className="fa fa-eye pwd" aria-hidden="true" onClick={()=>setIsresRevealPwd(false)}></i>:<i className="fa fa-eye-slash pwd" aria-hidden="true" onClick={()=>setIsresRevealPwd(true)}></i>}
                <div id="ucpErr"></div>
                <label for="rUPwd" className="text-secondary col-6 offset-3 mt-2" style={{fontSize: "10px"}}>Make sure the password contains atleast one lowercase and upper case alphabet,1 symbol and 1 special character and length ranges between 8-15
                </label>
                <input type="button" className="btn col-6 mt-4 rounded-5 text-center offset-3" id="signUp" value="SignUp"/>

            </form>
    </div>
    );
}