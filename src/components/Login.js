import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        sessionStorage.setItem("token", '');
    },[])

    const handleUsenameInputChange = event => {
        const { value } = event.target;
        setUsername(value);
    };

    const handlePasswordInputChange = event => {
        const { value } = event.target;
        setPassword(value);
    };

    const handleLogin = e => {
        e.preventDefault();
        axios
            .post("https://staging-api.tracknerd.io/v1/auth/login", {
                username,
                password
            })
            .then(response => {
                const res = response.data;
                sessionStorage.setItem("token", res.token);
                navigate('/dashboard');
            })
            .catch(err => {
                console.log("Error logging in: ", err.response.data.message);
                setError(true);
                setErrorMessage(err.response.data.message);
            });
    };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-12">
                        <div className="card" style={{ width: "18rem", marginTop: "10rem" }}>
                            <h2 className="card-header">Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={username}
                                            onChange={handleUsenameInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={password}
                                            onChange={handlePasswordInputChange}
                                        />
                                    </div>
                                    {error && (
                                        <div className="alert alert-danger">{errorMessage}</div>
                                    )}
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Login