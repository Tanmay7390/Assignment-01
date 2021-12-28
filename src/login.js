import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import './css/main.scss';
import './css/util.scss';
import './css/vendor/bootstrap/css/bootstrap.min.css';
import './css/vendor/animate/animate.css';
import './css/vendor/css-hamburgers/hamburgers.min.css';
import './css/vendor/select2/select2.min.css';
import 'font-awesome/css/font-awesome.min.css';
import img from './css/img-01.png';
import { useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Login() {
	const navigate = useNavigate();
	// var jwt = require('jsonwebtoken');
	const [login,setLogin]=useState({blocked:0});

	useEffect(()=>{
        
    },[]);

    return (
	<div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={img} alt="IMG"/>
				</div>

				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Member Login
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="username" placeholder="Username" required
						onChange={(e)=>{
							setLogin({...login,uid:e.target.value});
						}}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="pass" placeholder="Password" required
						onChange={(e)=>{
							setLogin({...login,password:e.target.value});
						}}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" type="button"
						onClick={()=>{
							Axios.post(`https://myphysio.digitaldarwin.in/api/login/`,login).then(
            				(response)=>{
								localStorage.setItem('login-state','logined');
								localStorage.setItem('mydata',JSON.stringify(response.data));
								let token = JSON.parse(localStorage.getItem('mydata'));
								let decodedToken = jwt_decode(token.jwt);
								// console.log("Decoded Token", decodedToken);
								let currentDate = new Date();
								// JWT exp is in seconds
								if (decodedToken.exp * 1000 < currentDate.getTime()) {
									console.log('invalid');
								} else {
									navigate('/get-patient');
									console.log("valid");
								}
            				}),
							(error)=>{
								console.log(error);
							}
						}}>
							Login
						</button>
					</div>

					<div className="text-center p-t-12">
						<span className="txt1">
							Forgot
						</span>
						<a className="txt2" href="#">
							&nbsp;&nbsp;Username / Password?
						</a>
					</div>

					<div className="text-center p-t-50">
						<a className="txt2" href="#">
							Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
)
}