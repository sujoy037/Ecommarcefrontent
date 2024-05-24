import React, { useState } from 'react';
import Layout from '../core/Layout';
import { authenticate, isAuthenticated, signin } from '../auth';
//import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Signin = () => {
  const navigate = useNavigate(); 
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error,redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // On successful sign-in, authenticate user and set redirectToReferrer to true
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  // Function to render error message if there is one
  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  // Function to render loading message
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  // Function to redirect user to home page if authenticated
  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1){
        return navigate('/admin/dashboard')
      }else{
        return navigate('/user/dashboard')
      }
      
    }
    if (isAuthenticated()) {
      return navigate('/');
  }
  };

  return (
    <Layout title="Signin" description="Signin to E-Commerce App" className="container col-md-8 offset-md-2">
      {showLoading()}
      {showError()}
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange('email')}
            type="email"
            className="form-control"
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange('password')}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* Render redirection if redirectToReferrer is true */}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
