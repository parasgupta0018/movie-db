import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './LoginForm.css';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    useEffect(() => {
        const userinfo = localStorage.getItem('user_info');
        if(userinfo){
            props.updateTitle('Home')
            props.history.push('/home');
        }
    },[props.history]);

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post('https://moviedbmernapp.herokuapp.com/server/login', payload)
            .then(function (response) {
                console.log(response)
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem("user_info",JSON.stringify(response.data));
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                props.showError(error.response.data);
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
    return(
    <>
        <div className="card p-4 col-12 col-lg-5 login-card mt-2 hv-center">
            <form>
                <div className="form-group mb-3">
                    <label className="col-sm-12 mb-2 control-label" style={{textAlign: 'left'}}>Email address</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter email" 
                        value={state.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="col-sm-12 mb-2 control-label" style={{textAlign: 'left'}}>Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
        <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
        {state.successMessage}
    </div></>
    )
}

export default withRouter(LoginForm);
