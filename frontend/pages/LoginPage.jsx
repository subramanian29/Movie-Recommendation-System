import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons"; 
import { useAuth } from '../components/AuthContext';
const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth()

  const onSubmit = async(data) => {

    try{
      const logged= await fetch("http://localhost:5000/login",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          credentials:'include',

            
          body: JSON.stringify(data)
      });
      const resp= await logged.json();
      setIsLoggedIn(()=>resp.user)
      navigate('/'); 
     
    }
    catch(e){
      setError("username", { type: "manual", message: "Invalid username" });
      setError("password", { type: "manual", message: "Invalid password" });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  placeholder="Enter your username"
                />
                {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  placeholder="Enter your password"
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <hr className="my-4" />

            <div className="text-center">
            <p>Or:</p>
            <button onClick={()=>{navigate("/register")}}  className="btn btn-primary w-100 mb-2">Create Your Account</button>
            <GoogleLoginButton  />
            <FacebookLoginButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
