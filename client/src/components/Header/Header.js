import React from 'react';
import { withRouter } from "react-router-dom";
function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if(props.location.pathname === '/') {
        title = 'Welcome'
    }
    function renderLogout() {
        if(props.location.pathname === '/home' || '/favourite'){
            let button;
            if(props.location.pathname === '/favourite'){
                button = <button className="btn btn-outline-secondary text-white" style={{marginRight: '1rem', color: 'white !important', borderColor: 'white !important'}} onClick={() => props.history.push('/home')}>Home</button>;
            }
            else if(props.location.pathname === '/home'){
                button =  <button className="btn btn-outline-secondary text-white" style={{marginRight: '1rem', color: 'white !important', borderColor: 'white !important'}} onClick={() => props.history.push('/favourite')}>My Favorites</button>
            }
            return(
                <div className="ml-auto">
                    {button}
                    <button className="btn btn-danger ml-2" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem("user_info")
        props.history.push('/login')
    }
    return(
        <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                <a className="navbar-brand" href="#"><span className="h3">{props.title || title}</span></a>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);
