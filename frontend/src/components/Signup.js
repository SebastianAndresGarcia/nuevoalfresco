import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Row, Card, Col, Form } from 'react-bootstrap';
import '../styles/login.scss'
import AuthService from "../services/auth.service";
import { Navigation } from './Navigation';

const Signup = () => {
  const currentUser = AuthService.getCurrentUser();
  let navigate = useNavigate();
  const form = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    verificarUsuario()
}, []);

const verificarUsuario = async () => {
    if (currentUser) {
        if (!currentUser.roles.includes("ROLE_ADMIN")) {
            navigate('/home')
            window.location.reload()
        }
    } else {
        navigate('/home')
        window.location.reload()
    }
}

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  /* const onChangeEmail = (e) => {
     const email = e.target.value;
     setEmail(email);
   }; */

  const handleRegister = (e) => {
    console.log("llegó a registrar")
    e.preventDefault();
    setMessage("");
    setLoading(true);
    AuthService.register(username, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        alert("usuario registrado correctamente")
        navigate("/login2");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };


  return (
    <>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: 'aqua' }} className="col-md-12">
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ margin: "5px", display: "flex" }}>
              <Button variant="success" href='/home'>Volver</Button>
            </div>
            <Card style={{ width: '18rem', margin: '10px' }}>

              <Card.Img variant="top"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />
              <Card.Text>
                <Form onSubmit={handleRegister} >
                  {!successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="username"
                          value={username}
                          onChange={onChangeUsername}
                          required
                        />
                      </div>


                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                      </div>
                    </div>
                  )}

                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful ? "alert alert-success" : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                </Form>
              </Card.Text>
            </Card>
          </Row>
        </div >
            
    </>
  )
}

export default Signup;
