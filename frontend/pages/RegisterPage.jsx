import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function RegisterPage(){
  const { register, handleSubmit, watch, formState: { errors },setError } = useForm();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  
  const password = watch('password', '');

  const onSubmit = async(data) => {
    try{
      const logged = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      
     

      const resp = await logged.json();
      console.log(resp)
      if (resp.success){
        setIsLoggedIn(()=>resp.user);
        navigate('/');
      }
      else{
        setError(resp.field, { type: "manual", message: resp.message });
      }
    }
    catch(e){console.log("")}
    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Create Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  {...register('username', { required: 'Username is required' })}
                  placeholder="User"
                />
                {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="email"
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    }
                  })}
                  placeholder="Create a password"
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};


