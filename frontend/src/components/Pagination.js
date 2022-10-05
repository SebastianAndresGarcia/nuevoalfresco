import React, { useState } from 'react';
import '../styles/pagination.css'
export const Pagination = ({ pagina, setPagina, maximo }) => {
    const [input, setInput] = useState(1);

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPagina(parseInt(pagina) + 1);
    };

    const previousPage = () => {
        setInput(parseInt(input) - 1);
        setPagina(parseInt(pagina) - 1);
    };

    const onKeyDown = e => {
        if (e.keyCode === 13) {
            setPagina(parseInt(e.target.value));
            if (
                parseInt(e.target.value < 1) ||
                parseInt(e.target.value) > Math.ceil(maximo) ||
                isNaN(parseInt(e.target.value))
            ) {
                setPagina(1);
                setInput(1);
            } else {
                setPagina(parseInt(e.target.value));
            }
        }
    };

    const onChange = e => {
        setInput(e.target.value);
    };

    return (
        <>
            {/*   <div >
                <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
                    previous
                </button>
                <input
                    onChange={e => onChange(e)}
                    onKeyDown={e => onKeyDown(e)}
                    name="page"
                    autoComplete="off"
                    value={input}
                />
                <p> de {maximo} </p>
                <button
                    disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
                    onClick={nextPage}
                >next

                </button>
    </div> */}
            <div style={{display: "flex", justifyContent:"center"}}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                    <p ><button style={{ border: "none" }} disabled={pagina === 1 || pagina < 1} onClick={previousPage}><li className="page-item"><a className="page-link" >Previous</a></li></button>
                        <input style={{ textAlign:"center", maxWidth : "70px", margin:"4px"}}
                            onChange={e => onChange(e)}
                            onKeyDown={e => onKeyDown(e)}
                            name="page"
                            autoComplete="off"
                            value={input}
                        /> de {maximo} 
                        <button style={{ border: "none", margin:"4px" }} disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={nextPage}><li className="page-item" ><a className="page-link" >Next</a></li></button>
                        </p>
                    </ul>
                </nav>
            </div>
        </>
    )
}