import React,{useState} from "react";
import './Login.css';
import { FaUser, FaLock, FaGoogle, FaApple } from "react-icons/fa";
import LoginImg from '../assets/images/Login2.JPG';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";


const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const { setIsLoggedIn } = useAuth();
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault(); 
      try {
          const response = await fetch("http://localhost:5000/auth/admin-login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
          });

          const result = await response.json();

          if (response.ok) {
              localStorage.setItem("token", result.data.logintoken);
              setIsLoggedIn(true);
              navigate("/");
          } else {
              setError(result.message || "Login failed. Please try again.");
          }
      } catch (err) {
          setError("An error occurred. Please try again later.");
      }
    };

    return (
        <div className="login-body">
            <img 
            src={LoginImg}
            alt="Login Img"
            className="Loginimg" 
            />
            <div className="wrapper">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" required 
                        value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required 
                        value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button onClick={handleLogin} className="loginBut" type="submit">Login</button>
                    
                    <div className="login-options">
                        <p>Or login with</p>
                        <button className="login-google">
                            <FaGoogle className="icon" /> Login with Google
                        </button>
                        <button className="login-apple">
                            <FaApple className="icon" /> Login with Apple
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};


export default Login;