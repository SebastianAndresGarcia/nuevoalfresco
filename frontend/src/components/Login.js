import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import '../styles/login.scss'

import AuthService from "../services/auth.service";


const Login = () => {
  let navigate = useNavigate();

  const form = useRef();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    AuthService.login(username, password).then(
      () => {
        navigate("/Home");
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
      <section className="section-container">
        <Row>
          <Col sm={8} className="left">
            <img src={require(`../assets/images/logo.jpeg`)} style={{ width: "90%" }} alt='imagen' />
          </Col>
          <Col sm={4} className="right">
            <h3>INICIAR SESION</h3>

            <Form onSubmit={handleLogin} >
              <Form.Group>
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Usuario" name='username' value={username}
                  onChange={onChangeUsername}
                  required />
                <Form.Text className="text-muted"  >
                </Form.Text>

                {/*<Form.Label>email</Form.Label>
                            <Form.Control type="email" placeholder="email" name='email' onChange={e => user.email = String(e.target.value)} defaultValue={user?.email}/>
                            <Form.Text className="text-muted"  >       
                      </Form.Text> */}

                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contrasenia" value={password}
                  onChange={onChangePassword}
                  required />

              </Form.Group>
              
              <Button style={{marginTop:"10px", marginBottom:"10px"}} type="onSubmit" className="btn-outline-success" variant="outline-light" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Ingresar</span>
              </Button>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </section>
    </>
  )
}

export default Login;
