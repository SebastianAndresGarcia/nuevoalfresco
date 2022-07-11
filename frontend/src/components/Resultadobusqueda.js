import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Navigation } from './Navigation';
import { Pagination } from './Pagination';
import '../styles/App.css'
import { buscarcausas } from './funcionesapi';
import AuthService from "../services/auth.service";

export function Resultadobusqueda() {
    const currentUser = AuthService.getCurrentUser();
    const { termino } = useParams();
    const terminobusqueda = ((String(termino).toUpperCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")).replace(/\./g, '');
    /*toUpperCase();//para volver mayúscula a todos las letras
    terminobusqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, "");//para quitar los acentos
    .replace(/\./g, '');  para quitar los puntos. Puse todas las fciones en una sola línea porque me daba error*/
    console.log("término de búsqueda recuperado useParams: " + terminobusqueda);

    const [causas, setCausas] = useState([])
    const [loading, setLoading] = useState(true)

    const getCausas = async () => {
        setTimeout(() => {
            console.log("cargando...1 seg");
        }, 1000);
        let datos = await buscarcausas(terminobusqueda);
        console.log(datos);
        setLoading(false);
        setCausas(datos);

    }
    useEffect(() => {

        getCausas()
    }, [])
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);

    //const [maximo, setMaximo] = useState(1) 
    const maximo = Math.ceil(causas.length / porPagina);
    console.log("porPagina " + porPagina + "; causas.length " + causas.length)

    function formatDate(data) {
        let date
        if (data !== null) {
            date = new Date(data)
            return date.toLocaleDateString("es-AR")
        } else {
            return ""
        }
    }

    const abrirpdf = async (ubicacion) => {

        window.open("http://172.17.17.22:8887/" + ubicacion, '_blank')
        //window.location.href=`file:///C:/Users/hp/Documents/tecnicatura/nuevoalfresco/backend/`+ubicacion
    }
    if (loading) {
        return (
            <h1>Cargando ... </h1>
        )
    }
    return (
        <>
            <Navigation></Navigation>
            {currentUser ? (
                <><h4>Término de Búsqueda: {String(termino)} </h4><div className='Table'>

                    <Table striped bordered hover>
                        <thead>
                            <tr><th>DNI</th><th>NOMBRE Y APELLIDO</th><th>NOMBRE DE ARCHIVO</th><th>FECHA DE INFORME</th><th></th></tr>
                        </thead>

                        <tbody>
                            {causas?.slice(
                                (pagina - 1) * porPagina,
                                (pagina - 1) * porPagina + porPagina
                            ).map(causa => (
                                <tr key={causa.id}>
                                    <td>{causa.dni}</td>
                                    <td>{causa.nombrecompleto}</td>
                                    <td>{causa.ubicacion}</td>
                                    <td>{formatDate(causa.fecha)}</td>
                                    <td><button type="button" class="btn btn-dark" onClick={() => abrirpdf(causa.ubicacion)}>VER CAUSA PDF</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/*causa != null ? " ": <h3><b>No se encontraron resultados</b></h3> no funcionó, se agrega msje en el style index.css*/}
                </div>
                    <div>
                        <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
                    </div></>)
                : (<><div style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}><h1>INICIE SESION PARA ACCEDER AL SISTEMA</h1>
                </div></>)
            }
        </>
    )
}
