export async function buscarcausas(termino){
	//let urlServer = 'http://localhost:3000/getcausasporbusqueda/'+termino;
	let urlServer = '172.17.17.22:3000/getcausasporbusqueda/'+termino;
	let response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*',
			'Access-Control-Allow-Credentials': 'true'
			
		},
        mode: 'cors',
		credentials: 'include'
	});
	console.log(response);
	return await response.json();
}