import { useEffect, useState } from "react";
import { userGetData,userSetData } from "./useGetData";
export default function Signup(){
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealresPwd, setIsresRevealPwd] = useState(false);
  const[data,setdata]=useState({name:"",uname:"",pwd:"",respwd:""});
  const[error,seterrors]=useState({});
  const[loading,setloading]=useState(false);
  const[toast,settoast]=useState(false);
  useEffect(()=>{
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem('userName');
  },[]);
  function regUser(e){
    e.preventDefault();
    const newErrors = handleError(data);
    seterrors(newErrors);
    if(Object.keys(newErrors).length===0){
      setloading(true);
      let isAvailable = userGetData(`http://localhost:8083/api/username_available/${data.uname}`,"get");
       isAvailable.then(d=>{
        if(d.available===false){
           seterrors({...error,uname:"User Name already taken"});
           setloading(false);
        }
        else{
          let userData={
            "name": data.uname,
            "username":data.uname ,
            "password": data.pwd
        };
        console.log(data);
          let user = userSetData('http://localhost:8083/api/users',"post",userData);
          user.then(d=>{
                if(d===201){
                  setloading(false);
                 settoast(true);
                }
          });
        }
      });
    }
  }
  function handleChange(e){
     setdata({...data,[e.target.name]:e.target.value});
  }
  function handleError(data){
    let errors={};
    if(data.name===''){
     errors.name="Enter Name";
    }
    else if(data.name.length<5||data.name.length>12){
     errors.name="Name should be less than 12 and greater than 4 letters";
    }
    else if(/^[a-zA-Z]+$/.test(data.name)===false){
      errors.name="Name should have only alphabets";
    }
    if(data.uname===''){
      errors.uname="Enter User Name";
    }
    else if(data.uname.length<5||data.uname.length>12){
      errors.uname="User Name should be less than 12 and greater than 5 letters";
     }
     if(data.pwd===''){
         errors.pwd="Enter password";
     }
     else if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(data.pwd))){
      errors.pwd="Make sure to enter the valid password"
     }
     if(data.respwd!==data.pwd){
      errors.respwd="Confirm Password should match with the above Password";
     }
     return errors;
  }
    return(
     <>
     <div className='col-md-6 log w3-animate-left'>
     <div className="row">
     {toast&& (<div className="alert alert-primary w3-animate-opacity" style={{marginTop:"-100px",marginLeft:"-400px"}} role="alert">
                       <spnan className=" text-center fw-bold text-primary">User added Successfully <span className="btn-close" style={{float:"right"}} onClick={()=>{settoast(false);window.location.href();}}></span></spnan>
                   </div>)}
            <div className="col-12 topStyle">
                <img src="./register.webp" class="col-2 img" alt="no"/>
             </div>
        </div>
        {(loading ? <div className="d-flex justify-content-center">
            <div className="spinner-border" style={{height:"100px",width:"100px",marginTop:"70px"}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
   
      :<form className="form" onSubmit={regUser}>
                <input type="text" name="name" value={data.name} onChange={handleChange} className={`${error.name && "border border-danger"} col-6 form-control-sm text-center rounded-5 offset-3`} id="rName" placeholder="Enter your Name" required/>
                {(error.name&&<div className="col-md-12 text-danger text-center">{error.name}</div>)}
                <input type="text" name="uname" value={data.uname} onChange={handleChange} className={`${error.uname && "border border-danger"} col-6 form-control-sm mt-3 text-center rounded-5 offset-3`} id="rUName" placeholder="Enter user name you want to use" required/>
                {(error.uname&&<div className="col-md-12 text-danger text-center">{error.uname}</div>)}
                <input  name="pwd" className={` ${error.pwd && "border border-danger"} col-6 form-control-sm mt-3 text-center rounded-5 offset-3`} id="rUPwd" placeholder=" Enter password" 
                type={isRevealPwd ? "text" : "password"}
                value={data.pwd}
                onChange={handleChange}
                />
                {isRevealPwd?<i className="fa fa-eye pwd" aria-hidden="true" onClick={()=>setIsRevealPwd(false)}></i>:<i className="fa fa-eye-slash pwd" aria-hidden="true" onClick={()=>setIsRevealPwd(true)}></i>}
                {(error.pwd&&<div className="col-md-12 text-danger text-center">{error.pwd}</div>)}
                <input name="respwd" className={`${error.respwd && "border border-danger"} col-6 form-control-sm mt-3 text-center rounded-5 offset-3`} id="rUcPwd" placeholder=" Confirm password" required
                type={isRevealresPwd ? "text" : "password"}
                value={data.respwd}
                onChange={handleChange}
                />
                 {isRevealresPwd?<i className="fa fa-eye pwd" aria-hidden="true" onClick={()=>setIsresRevealPwd(false)}></i>:<i className="fa fa-eye-slash pwd" aria-hidden="true" onClick={()=>setIsresRevealPwd(true)}></i>}
                 {(error.respwd&&<div className="col-md-12 text-danger text-center">{error.respwd}</div>)}
                <p  className="text-secondary col-6 offset-3 mt-2" style={{fontSize: "10px"}}>Make sure the password contains atleast one lowercase and upper case alphabet,1 symbol and 1 special character and length ranges between 8-15
                </p>
                <input type="submit" className="btn col-6 mt-4 rounded-5 text-center offset-3" id="signUp" value="SignUp" onClick={regUser}/>

            </form>)}
    </div>
    </>
    );
}