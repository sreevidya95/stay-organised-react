import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Landing(){
  const navigate = useNavigate();
  useEffect(()=>{
      if(localStorage.getItem('name')!== undefined &&localStorage.getItem('name')!== null && localStorage.getItem('name')!== ""){
        navigate(`/Home/${localStorage.getItem('id')}`);  
    }
  },[]);
    return(
        <div className="container-fluid">
            <div className="row" style={{backgroundColor:"#6b48b4"}}>
            <nav className="navbar navbar-expand-md fixed-top" id="navbar" style={{backgroundColor: "rgba(49, 60, 89, 0)",backdropFilter: "blur(30px)"}} data-navbar-soft-on-scroll="data-navbar-soft-on-scroll">
          <div className="container-fluid px-0"><Link to="/"><img className="navbar-brand w-75 d-md-none" src="./logo.webp" alt="logo" /></Link>
          <Link className="navbar-brand fw-bold fs-3 text-white ms-5" to="/">Listopia</Link>
          <Link className="btn btn-primary btn-sm ms-md-x1 mt-lg-0 order-md-1 ms-auto button b" to="/login">Get Started Now </Link>
          <button className="navbar-toggler border-0 pe-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" 
          aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse justify-content-md-end" id="navbar-content" data-navbar-collapse="data-navbar-collapse">
              <ul className="navbar-nav" style={{
                paddingLeft:'0',
                position: "relative",
                left:"-100px"}} data-navbar-nav="data-navbar-nav">
                <li className="nav-item"> <Link className="nav-link fw-bold fs-5 text-white" to="https://www.lipsum.com/">About us</Link></li>
                <li className="nav-item"> <Link className="nav-link fw-bold fs-5 text-white" to="mailto:support@listopia.com">Support</Link></li>
                <li className="nav-item"> <Link className="nav-link fw-bold fs-5 text-white" to="#pricing">Pricing</Link></li>
                <li className="nav-item"> <Link className="nav-link fw-bold fs-5 text-white" to="mailto:info@listopia.com">Contact</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div data-bs-target="#navbar" data-bs-spy="scroll" tabindex="0">
          <section className="hero-section overflow-hidden position-relative z-0 mb-4 mb-lg-0" id="home">
            <div className="hero-background">
              <div className="container">
                <div className="row" style={{marginTop: "100px",
                            marginLeft: "100px",
                        }}>
                  <div className="col-lg-6 text-center text-lg-start">
                    <h1 className="display-1 text-white fw-bold mb-2  mt-3 lh"> Manage your <span className="text-nowrap">tasks</span></h1>
                    <p className="fs-8 text-white mb-3 mb-lg-4 lh-lg">we help you stay organized and productive through out the day
                    </p>
                    <div className="d-flex justify-content-center justify-content-lg-start"><Link className="btn btn-primary btn-lg lh-xl mb-4 mb-md-5 mb-lg-7" to="https://www.lipsum.com/">Explore more</Link></div>
                    <p className="mb-x1 fs-10 button-text text-uppercase fw-bold lh-base text-300">Download our app</p>
                    <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 position-relative z-2">
                      <Link className="border-0 p-0 bg-transparent cursor-pointer rounded-1" to="#!">
                       <img className="img-fluid" src="./img/logos/App_Store.webp" alt="assets/img/logos/App_Store.webp" /></Link>
                       <Link class="border-0 p-0 bg-transparent cursor-pointer rounded-1" href="#!"> 
                      <img class="img-fluid" src="./img/logos/Play_Store.webp" alt="./img/logos/Play_Store.webp" /></Link></div>
                  </div>
                  <div className="col-lg-6 position-lg-relative">
                    <div className="position-lg-absolute z-1 text-center">
                      <img className="img-fluid chat-image" src="./img/Hero/collaborator.webp" alt="" />
                      <div className="position-absolute dots d-none d-md-block"> <img className="img-fluid w-50 w-lg-75" 
                      src="./img/illustrations/Dots.webp" alt="" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="position-absolute bottom-0 start-0 end-0 z-1"><img className="wave mb-md-n2" src="./img/illustrations/Wave.svg" alt="" />
              <div className="bg-white py-2 py-md-5"></div>
            </div>
          </section>
          </div>
            </div>
        </div>
    )
}