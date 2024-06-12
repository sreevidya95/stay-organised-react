export default function Alert(props){
    let click = props.onClick;
    const style={
      marginTop:props.val ? "-100px":"-60px",
      marginLeft:props.val ? '-400px' : "10px",
      height:"20px !important",
    };
    return(
        <div className="alert alert-primary w3-animate-top" style={style} role="alert">
                       <spnan className=" text-center fw-bold text-dark">{props.message} <span className="btn-close" style={{float:"right"}} onClick={click}></span></spnan>
                   </div>
    );
}