import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Navigation } from './Navigation';
import AuthService from "../services/auth.service";
import { cantidaddecausas } from './funcionesapi';
import UserService from '../services/user.service';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) { console.log("currentuser :" + currentUser.username + "\n accessToken: " + currentUser.accessToken) }
    const { termino } = useParams();
    const terminobusqueda = termino
    console.log("término de búsqueda recuperado useParams: " + terminobusqueda);
    const [nrocausas, setNrocausas] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        verificarUsuario()
        //getcantidadcausas();
    }, []);

    const verificarUsuario = async () => {
        if (currentUser) {
            try {
                const query = await UserService.getUserBoard()
                if (query.status === 200) {
                    getcantidadcausas();
                }
            } catch (e) {
                console.log(e)
                AuthService.logout()
                navigate('/login2')
                window.location.reload()
            }
        } else {
            AuthService.logout()
            navigate('/login2')
            window.location.reload()
        }

    }

    const getcantidadcausas = async () => {
        let cantidad = await cantidaddecausas();
        console.log("cantidad home", cantidad);
        setNrocausas(cantidad[0]);
        setLoading(false)
    }

    if (loading) {
        return (
            <h1>Cargando</h1>
        )
    }
    return (
        <>
            <Navigation></Navigation>
            <h5 style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>Cantidad de causas indexadas: {nrocausas}</h5>
            {
                /*currentUser ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Card className="justify-content-md-center mt-3 border" style={{ width: "30%" }}>
                            <Card.Img variant="top" src={require(`../assets/images/logoudapif.jpeg`)} />
                            <Card.Body>
                                <Card.Text>
                                    <h2 style={{ textAlign: "center" }}><b>BUSQUEDA DE CAUSAS EN UFIS</b></h2>
                                    <p style={{ textAlign: "justify", fontFamily: "Georgia", fontSize: "x-large" }}>En caso de realizar una búsqueda por número de DNI, el sistema entiende como equivalente el ingreso de un número
                                        con puntos o sin puntos, por lo que el resultado al ingresar un número con la forma XX<b>.</b>XXX<b>.</b>XXX o XXXXXXXX o XX<b>.</b>XXXXXX
                                        arroja el mismo resultado.
                                        En caso de buscar mediante nombre de la persona, se sugiere ingresar al menos dos palabras para acotar la búsqueda.
                                    </p>
                                    <p style={{ textAlign: "justify", fontFamily: "Georgia" }}> Próximamente se habilitará la búsqueda de causas por número de teléfono y número de CBU/CVU</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </div>
                ) : (<><div style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}><h1>INICIE SESION PARA ACCEDER AL SISTEMA</h1>
                </div></>)*/
            }
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card className="justify-content-md-center mt-3 border" style={{ width: "30%" }}>
                    <Card.Img variant="top" src={require(`../assets/images/logoudapif.jpeg`)} />
                    <Card.Body>
                        <Card.Text>
                            <h2 style={{ textAlign: "center" }}><b>BUSQUEDA DE CAUSAS EN UFIS</b></h2>
                            <p style={{ textAlign: "justify", fontFamily: "Georgia", fontSize: "x-large" }}>En caso de realizar una búsqueda por número de DNI, el sistema entiende como equivalente el ingreso de un número
                                con puntos o sin puntos, por lo que el resultado al ingresar un número con la forma XX<b>.</b>XXX<b>.</b>XXX o XXXXXXXX o XX<b>.</b>XXXXXX
                                arroja el mismo resultado.
                                En caso de buscar mediante nombre de la persona, se sugiere ingresar al menos dos palabras para acotar la búsqueda.
                            </p>
                            <p style={{ textAlign: "justify", fontFamily: "Georgia" }}> Próximamente se habilitará la búsqueda de causas por número de teléfono y número de CBU/CVU</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}