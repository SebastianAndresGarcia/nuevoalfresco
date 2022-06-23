import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Navigation } from './Navigation';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/App.css'

export function Resultadobusqueda() {

    const { termino } = useParams();
    const terminobusqueda = ((String(termino).toUpperCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")).replace(/\./g, '');
    /*toUpperCase();//para volver mayúscula a todos las letras
    terminobusqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, "");//para quitar los acentos
    .replace(/\./g, '');  para quitar los puntos. Puse todas las fciones en una sola línea porque me daba error*/
    console.log("término de búsqueda recuperado useParams: " + terminobusqueda);

    const [causas, setCausas] = useState()
    useEffect(() => {
        fetch('http://localhost:3000/getcausasporbusqueda/' + terminobusqueda)
            .then(response => response.json())
            .then(setCausas)
    }, [])

    const abrirpdf = async (ubicacion) => {

        window.open("http://127.0.0.1:8887/" + ubicacion, '_blank')
        //window.location.href=`file:///C:/Users/hp/Documents/tecnicatura/nuevoalfresco/backend/`+ubicacion
    }
    return (
        <>
            <Navigation></Navigation>
            <h4>Término de Búsqueda: {String(termino)} </h4>
            <div className='Table'>
               
                    <Table striped bordered hover >
                        <thead>
                            <tr><th>#</th><th>DNI</th><th>NOMBRE Y APELLIDO</th><th>NOMBRE DE ARCHIVO</th><th></th></tr>
                        </thead>

                        <tbody>

                            {causas?.map(causa => (
                                <tr key={causa.id}> 
                                    <td>{causa.id}</td> 
                                    <td>{causa.dni}</td>
                                    <td>{causa.nombrecompleto}</td>
                                    <td>{causa.ubicacion}</td>
                                    <td><button type="button" class="btn btn-dark" onClick={() => abrirpdf(causa.ubicacion)}>VER CAUSA PDF</button>
                                    </td>
                                </tr>
                            ))
                            }
                            

                        </tbody>

                    </Table>
                    
                    {/*causa != null ? " ": <h3><b>No se encontraron resultados</b></h3> no funcionó, se agrega msje en el style index.css*/}

            </div>
        </>
    )
}