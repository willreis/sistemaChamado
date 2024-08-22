import React from 'react';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
