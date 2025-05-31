import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../Axios";
import { useNavigate } from "react-router-dom";
import { toaster } from "../Library";
/** Actions */

function Signup() {
  const navigate = useNavigate();
  const [errors, serErrors] = useState({});
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChnager = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, ...{ [name]: value } });
    serErrors({ ...errors, ...{ [name]: "" } });
  };

  const register = async () => {
    const data = await Axios({
      method: "POST",
      url: "http://localhost:2001/api/v1/user/userRegistration",
      data: formValue,
    });
    console.log("datadata", data);

    if (data.success) {
      navigate("/");
      toaster(data.message, "success");
    } else {
      serErrors(data.errors);
    }
  };

  return (
    <>
      <div className="lemonpay_back pt-2 pt-md-3 pt-lg-4">
        <Container>
          <div className="text-center text-md-start">
            <img src={logo} className="logo" alt="logo" />
          </div>

          <div className="d-block d-md-flex justify-content-between align-items-end pt-3 pt-lg-5 pb-4 pb-lg-4">
            <h2 className="text-white d-none d-md-block">
              Join 1000 Businesses <br />
              <span className="themetxt">Powering Growth with</span> <br />
              Lemonpay!
            </h2>
            <div>
              <h3 className="text-white">Welcome Signup System</h3>
              <p className="text-white">
                your gateway to seamless <br />
                transactions and easy payments.
              </p>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => handleChnager(e)}
                />
                <p style={{ color: "red" }}>{errors?.email}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChnager(e)}
                />
                <p style={{ color: "red" }}>{errors?.password}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="Confirm password"
                  placeholder="Password"
                  name="confirmPassword"
                  onChange={(e) => handleChnager(e)}
                />
                <p style={{ color: "red" }}>{errors?.confirmPassword}</p>
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex justify-content-end"
                controlId="formBasicCheckbox"
              >
                {/* <Form.Check type="checkbox" label="" /> */}
                <Link to="/" className="sign">
                  Sign In
                </Link>
              </Form.Group>
              <button className="logbtn w-100" onClick={register}>
                Sign Up
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Signup;
