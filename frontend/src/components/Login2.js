import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import '../styles/login2.css'

import AuthService from "../services/auth.service";


const Login2 = () => {
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
            <Container fluid  >

                <Row className="image" >

                    <Col xs={8} sm={8} md={8}>
                    </Col>

                    <Col xs={4} sm={4} md={4} className="login" >

                        <Row >
                            <Col className="" >
                                <h1 align="center">U D A P I F</h1>
                                <img src={require("../assets/images/logoMP.jpg")} alt='imagen' />
                            </Col>
                        </Row>
                        <Row >
                            <Col className="" sm={12} >
                                <Form >

                                    <Row style={{ margin: "10%"}}>
                                        <Form.Control
                                            type="text" placeholder="Usuario" name='username' value={username}
                                            onChange={onChangeUsername}
                                            required
                                        ></Form.Control>
                                    </Row>

                                    <Row style={{ margin: "10%" }}>
                                        <Form.Control
                                            type="password" placeholder="Contrasenia" value={password}
                                            onChange={onChangePassword}
                                            required
                                        ></Form.Control>
                                    </Row>
                                    <Row className="" align="center" >
                                        <Col className="d-grid gap-2"  style={{ marginLeft: "10%",marginRight: "10%" }}>
                                            <Button className="btn btn-success" type="submit">
                                                Ingresar
                                            </Button></Col>
                                        
                                    </Row>
                                </Form>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>

        </>


    )
}

export default Login2;

