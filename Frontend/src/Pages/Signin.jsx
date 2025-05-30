import React from 'react';
import logo from "../assets/logo.png";
import { Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Signin() {

  return (
    <>
    
    <div className='lemonpay_back pt-2 pt-md-3 pt-lg-4'>
     <Container>
        <div className='text-center text-md-start'><img src={logo} className='logo' alt='logo'/></div>

      <div className='d-block d-md-flex justify-content-between align-items-end pt-3 pt-lg-5 pb-4 pb-lg-4'>
        <h2 className='text-white d-none d-md-block'>Join 1000 Businesses <br/>
           <span className='themetxt'>Powering Growth with</span> <br/>
            Lemonpay!</h2>
      <div>
        <h3 className='text-white'>Welcome Login System</h3>
        <p className='text-white'>your gateway to seamless <br/>transactions and easy payments.</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    
      <Form.Group className="mb-3 d-flex justify-content-between" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember Me" />
        <Link to="/signup" className='sign'>Sign Up</Link>
      </Form.Group>
      <button className='logbtn w-100'>Sign In</button>
      </div>
      </div>

     </Container>
     

    </div>
    
    
    
    </>
  )
}

export default Signin