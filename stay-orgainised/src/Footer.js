import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <footer className="row">
        <div className="col-xl-4 mt-3">
         <h5 className="h5 col-12 text-center"><u>Listopia</u></h5>
         <p className="col-12 text-center text-white">Listopia is website that helps you share your daily tasks <br/>with your family or work.<br/>we help you stay organised</p>
        </div>
        <div className="col-xl-4 mt-3">
         <h5 className="h5 col-12 text-center"><u>Our Products</u></h5>
         <p className="text-center">
         <Link className="col-12 mt-2 text-white" to="mailto:info@listopia.com" target="_newtab">ContactUS</Link><br/>
         <Link className="col-12 mt-2 text-white" to="https://www.lipsum.com/">Our Blog</Link><br/>
         <Link className="col-12 mt-2 text-white" to="https://www.lipsum.com/">Our Products</Link><br/>
         <Link class="col-12 mt-2 text-white" to="https://www.lipsum.com/">Help</Link><br/></p>
        </div>
        <div className="col-xl-4 mt-3">
         <h5 className="h5 col-12 text-center"><u>Our Location</u></h5>
            <p className="col-12 text-center text-white"><i className="fa fa-home"></i> 15th Floor,TechCity,Bangalore</p> 
            <p className="col-12 text-center text-white"><i className="fa fa-envelope"></i> info@listopia.com</p> 
            <p className="col-12 text-center text-white"><i className="fa fa-mobile-phone"></i> +918888888888</p>
            <p className="col-12 text-center text-white"><i className="fa fa-fax"></i> +01 234 567 89</p>
        </div>
     </footer>
    );
}