export function valida(input) {

    const tipoInput = input.dataset.tipo;
    console.log(tipoInput);
    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing", "typeMismatch", "patternMismatch", "customError"
];

const mensajeDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La contraseña no es valida"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXX-XXX-XXXX"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 2 a 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 2 a 40 caracteres"
    },
};


const validadores = {
    // nombre: input => validacionNombre(input),
    nacimiento: input => validacionNacimiento(input),
};

function mostrarMensajeDeError(tipoInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(error);

            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoInput][error]);
            mensaje = mensajeDeError[tipoInput][error];
        }
    });

    return mensaje;
}


function validacionNacimiento(input) {
    let mensaje = "";
    const fecha = new Date(input.value);
    if (!mayorDeEdad(fecha)) {
        mensaje = "Debes tener al menos 18 años de edad";

    }
    input.setCustomValidity(mensaje);

}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());


    return diferenciaFechas < fechaActual;
}