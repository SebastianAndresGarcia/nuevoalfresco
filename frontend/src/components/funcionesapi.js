const config = require("../config/config.js");

export async function buscarcausas(termino){
	//let urlServer = 'http://localhost:3000/getcausasporbusqueda/'+termino;
	let urlServer = 'http://'+config.HOST+':3000/getcausasporbusqueda/' + termino;
	let response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*',
			//'Access-Control-Allow-Credentials': 'true'
			
		},
        mode: 'cors',
		//credentials: 'include'
	});
	//console.log(response);
	//return await response.json();
	let respuesta = await response.json()
	console.log(respuesta)
	return respuesta
}

export async function signup(user){
	let urlServer = 'http://'+config.HOST+':3000/api/auth/signup';
	let method = 'POST';
	let status;
	console.log("usuario en fcion ",user)
	let respuesta=await fetch(urlServer, { 
		"method": method,
		"body": JSON.stringify(user),
		"headers": { 
			"Content-type": 'application/json'
		},
		mode:'cors'
	});
	status = respuesta.status
	respuesta = await respuesta.json()
	console.log(respuesta)
	return {message: respuesta.message, status: status}
}
export async function signin(user){
	let urlServer = 'http://'+config.HOST+':3000/api/auth/signin';
	let method = 'POST';
	let status
	let respuesta=await fetch(urlServer, { 
		"method": method,
		"body": JSON.stringify(user),
		"headers": {
			"Content-type": 'application/json'
		},
		mode:'cors'
        
	});
	status = respuesta.status
	respuesta = await respuesta.json()
	console.log(respuesta)
	return {message: respuesta.message, status: status}

}

export async function cantidaddecausas(){
	
	let urlServer = 'http://'+config.HOST+':3000/cantidaddecausas';
	let response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*',
		},
        mode: 'cors',
	});
	
	let respuesta = await response.json()
	console.log("respuesta",respuesta)
	
	return respuesta
}