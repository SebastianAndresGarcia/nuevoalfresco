import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus"


export function Navigation() {

    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);

            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();

        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };

    const [datos, setDatos] = useState({
        termino: '',

    })
    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    const enviarDatos = (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.termino)
        window.location.href = `/resultadobusqueda/` + datos.termino
    }


    return (

        <>
            <Navbar bg="primary" className="navbar navbar-dark bg-dark" >
                <Container fluid>
                    <Navbar.Brand href="/Home" style={{ marginLeft: "20px" }}><img src={require(`../assets/images/logoudapif.jpeg`)} alt={"logo"} style={{ width: "150px" }} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            {currentUser ? (<Nav.Link>Bienvenido {currentUser.username}</Nav.Link>
                            ) : ""}

                            {showAdminBoard && (

                                <><Nav.Link href="/cargarnuevascausas">CARGAR CAUSAS</Nav.Link><Nav.Link href="/Signup">
                                    Registrar Usuario
                                </Nav.Link></>

                            )}


                        </Nav>
                        {currentUser ? (<Form className="form-inline my-2 my-lg-0" onSubmit={enviarDatos}>
                            <div class="row">
                                <div class="col">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="form-control mr-sm-2"
                                        aria-label="Search"
                                        onChange={handleInputChange}
                                        name="termino"

                                    /></div>
                                <div class="col"> <Button className="btn btn-success my-2 my-sm-0" type="submit" variant="success" >Buscar Causas</Button></div>
                            </div>

                        </Form>) : ""}

                        {currentUser ? (

                            <>
                                <Nav.Link href="/login" onClick={logOut}>
                                    LogOut
                                </Nav.Link></>

                        ) : (
                            <><Nav.Link href="/login">
                                Login
                            </Nav.Link>
                                                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

