import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signup } from '../auth';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const { name, email, password, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        });
      }
    });
  };

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout title="Signup" description="Signup to E-Commerce App" className="container col-md-8 offset-md-2">
      {showSuccess()}
      {showError()}
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange('name')}
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChange('email')}
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange('password')}
            value={password}
          />
        </div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Signup;
