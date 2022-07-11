import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Row, Alert } from 'react-bootstrap';
import { Navigation } from './Navigation';
import AuthService from '../services/auth.service';

export function Cargarnuevascausas() {
    //https://stackoverflow.com/questions/65548792/how-to-upload-multiple-file-with-react-node-and-multer
    const [archivos, setArchivos] = useState(null)
    const [status, setStatus] = useState(false)
    const currentUser=AuthService.getCurrentUser()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        console.log("archivos length" + archivos.length)
        for (let i = 0; i < archivos.length; i++) {
            formData.append('archivos', archivos[i]);
        }
        const response = await fetch('http://172.17.17.22:3000/cargarnuevascausas', {
            method: 'POST',
            body: formData,
            //encType: "multipart/form-data"
        })
        if (response) setStatus(true)
    }

    return (
        <>
            <Navigation></Navigation>
            {currentUser ? (
                <>
                    {!status ?

                        <div style={{ display: "flex", justifyContent: "center" }}>

                            <Row>
                                <h2 style={{ display: "flex", justifyContent: "center", padding: "6%" }}>CARGAR CAUSAS NUEVAS</h2>
                                <form style={{ display: "flex", justifyContent: "center" }} onSubmit={handleSubmit} encType="multipart/form-data" method='POST'>
                                    <div className="col-auto">
                                        <input
                                            className="form-control"
                                            name='archivos'
                                            type="file"
                                            directory=""
                                            //webkitdirectory='' //me permite elegir una carpeta y carga todos los archivos contenidos, si lo saco me deja elegir de un pdf a la vez
                                            multiple  //me permite elegir varios archivos pdf a la vez, si lo saco solo deja elegir uno
                                            accept=".pdf"
                                            onChange={(e) => setArchivos(e.target.files)}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <Button type='submit' style={{ marginLeft: "10px" }}>Agregar Causas</Button>
                                    </div>
                                </form>
                            </Row>
                        </div> : ""}

                    <Alert show={status} variant="success" style={{ margin: "5%" }}>
                        <Alert.Heading>Archivos cargados satisfactoriamente!</Alert.Heading>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => { setStatus(false); window.location.reload(true) }} variant="outline-success">
                                Volver
                            </Button>
                        </div>
                    </Alert>

                </>)
                : (<><div style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}><h1>INICIE SESION PARA ACCEDER AL SISTEMA</h1>
                </div></>)
            }
        </>
    )
}
