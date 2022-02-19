

//expresiones regulares para validar
const expresiones = {
	nombre: /^[a-zA-ZA\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10}$/ // 10 numeros
}

document.addEventListener('DOMContentLoaded',()=>{

    iniciarApp();

});

const iniciarApp = () =>{


}