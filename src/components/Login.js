import React, { useContext, useState } from 'react'
import {  useNavigate } from 'react-router-dom';

export default function Login(props) {
    // console.log(showAlert());
    const [cred,setCred] = useState({email :'',password:''});
    const history = useNavigate();
    const onChange = (e)=>{
        setCred({...cred,[e.target.name] : e.target.value});
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let url = `http://localhost:5000/api/auth/login` ; 
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body : JSON.stringify({email : cred.email,password: cred.password})
        })
        let json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            history('/');
            props.showAlert("You have successfully loged in" , "success");
        }
        else{
            props.showAlert("Wrong credentials" , "danger");
        }


    }
    return (
        <div className='container'>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" id="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onSubmit={onSubmit} onClick={onSubmit}>Submit</button>
            </form>

        </div>
    )
}
