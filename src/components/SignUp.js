import { useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";


export default function SignUp(props) {
  const [cred, setCred] = useState({ name: '', email: '', password: '' ,cpassword:''});
  const navigate = useNavigate();
  const onChange = (e) => {
    console.log(e.target.value);
    setCred({ ...cred, [e.target.name]: e.target.value });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    let url = `http://localhost:5000/api/auth/creatuser`;
    console.log(cred.name);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': "application/json",
      },
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
    })
    let json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/')
      props.showAlert("Your account has been created", "success");
    }
    else{
      props.showAlert("Try again with a diffrent email" , "danger");
    }
  }
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input name="name" type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input name="password" type="password" className="form-control" id="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input name="cpassword" type="password" className="form-control" id="cpassword" onChange={onChange} minLength={5} required />
        </div>
        <button disabled={cred.password !== cred.cpassword} type="submit" className="btn btn-primary" >Sign Up</button>
      </form>
    </div>
  )
}
