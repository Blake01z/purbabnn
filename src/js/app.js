const formulario = document.querySelector('#formulario');
const inputs = document.querySelectorAll('.input');

//expresiones regulares para validar
const expresiones = {
	nombre: /^[a-zA-ZA\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10}$/ // 10 numeros
}

const userObj = {
    nombre: false,
    email: false,
    telefono: false,
    interest: false
}

document.addEventListener('DOMContentLoaded',()=>{
    iniciarApp();
});


//Valida campos del formulario
const validarFormulario = (e) => {

    switch(e.target.name){
        case "nombre":
                valdiarCampo(expresiones.nombre,e.target,'nombre');

        break;
        
        case "email":
            valdiarCampo(expresiones.correo,e.target,'email');

        break;

        case "telefono":
            valdiarCampo(expresiones.telefono,e.target,'telefono');

        break;

        case "interest":
            valdiarCampoSelect(e.target.value);
        break;

        default:
            break;
    }

}


//validacion de campos
const valdiarCampo = (expresion,input,campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`${campo}`).classList.remove('form__incorrecto');
        document.querySelector(`.input__${campo}`).classList.remove('form__input-error-activo');
    
        userObj[campo] = true;
    }else{
        document.getElementById(`${campo}`).classList.add('form__incorrecto');
        document.querySelector(`.input__${campo}`).classList.add('form__input-error-activo');

        userObj[campo] = false;
    }
}

const valdiarCampoSelect = (valor) => {
    if(valor !== ''){
        document.getElementById(`interest`).classList.remove('form__incorrecto');
        document.querySelector(`.input__interest`).classList.remove('form__input-error-activo');

        userObj['interest'] = true;
    }else{
        document.getElementById(`interest`).classList.add('form__incorrecto');
        document.querySelector(`.input__interest`).classList.add('form__input-error-activo');

        userObj['interest'] = false;
    }
}


const iniciarApp = () =>{
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur',validarFormulario);
        input.addEventListener('focus',validarFormulario);
    })



    formulario.addEventListener('submit', (e) => {
        e.preventDefault()

        const {nombre,email,telefono,interest} = userObj;

        if(nombre && email && telefono && interest){
            formulario.reset();

            const mensajeExito = document.querySelector('.alerta');
            const mensajeP = document.createElement('P');
            mensajeP.textContent = 'Tus datos se enviaron correctamente.';
            mensajeP.classList.add('exito');

            mensajeExito.appendChild(mensajeP);

            userObj.nombre = false;
            userObj.email = false;
            userObj.telefono = false;
            userObj.interest = false;

            setTimeout(() => {
                mensajeP.remove()
            },3000)
        }else{
            const mensajeError = document.querySelector('.alerta');
            const mensajerE = document.createElement('P');
            mensajerE.textContent = 'Todos los campos son obligatorios';
            mensajerE.classList.add('warning');

            mensajeError.appendChild(mensajerE);
            setTimeout(() => {
                mensajerE.remove('warning');
            },3000)
        }
    })

}