export default function Home(){
    console.log(localStorage.getItem('name'));
    console.log(sessionStorage.getItem('name'));
    return(
        <h1>Dashboard</h1>
    );
}