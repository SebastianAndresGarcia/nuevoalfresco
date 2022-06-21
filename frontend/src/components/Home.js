import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Table, Card } from 'react-bootstrap';
import { Navigation } from './Navigation';


export function Home() {

    const { termino } = useParams();
    const terminobusqueda = termino
    console.log("término de búsqueda recuperado useParams: " + terminobusqueda);

   /* const [causas, setCausas] = useState()
    useEffect(() => {
        fetch('http://localhost:3000/getcausas')
            .then(response => response.json())
            .then(setCausas)
    }, []) */

    const abrirpdf = async (ubicacion) => {

        window.open("http://127.0.0.1:8887/" + ubicacion, '_blank')
        //window.location.href=`file:///C:/Users/hp/Documents/tecnicatura/nuevoalfresco/backend/`+ubicacion
    }
    return (
        <>
            <Navigation></Navigation>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card className="justify-content-md-center mt-5 border" style={{ width: "50%" }}>
                    <Card.Img variant="top" src={require(`../assets/images/logoudapif.jpeg`)} />
                    <Card.Body>
                        <Card.Text>
                            <h3 style={{textAlign: "center" }}><b>BUSQUEDA DE CAUSAS EN UFIS</b></h3>
                            <p style={{textAlign: "justify", fontFamily:"Georgia" }}>En caso de realizar una búsqueda por número de DNI, el sistema entiende como equivalente el ingreso de un número
                                con puntos o sin puntos, por lo que el resultado al ingresar un número con la forma XX<b>.</b>XXX<b>.</b>XXX o XXXXXXXX o XX<b>.</b>XXXXXX
                                arroja el mismo resultado.
                                En caso de buscar mediante nombre de la persona, se sugiere ingresar al menos dos palabras para acotar la búsqueda.
                            </p>
                            <p> Próximamente se habilitará la búsqueda de causas por número de teléfono y número de CBU/CVU</p>
                        </Card.Text>
                    </Card.Body>
                </Card>

            </div>
            {/*  <div className='Table'>
                <Table striped bordered hover>
                    <thead>
                        <tr><th>#</th><th>DNI</th><th>NOMBRE Y APELLIDO</th><th>UBICACIÓN</th></tr>
                    </thead>
                    <tbody>
                        {causas?.map(causa => (
                            <tr key={causa.id}>
                                <td>{causa.id}</td>
                                <td>{causa.dni}</td>
                                <td>{causa.nombrecompleto}</td>
                                <td><button type="button" class="btn btn-dark" onClick={() => abrirpdf(causa.ubicacion)}>VER CAUSA PDF</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                        </div> */}
        </>
    )
}