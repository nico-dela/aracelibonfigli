// dom
const inputNombre = document.getElementById('name_input')
const inputApellido = document.getElementById('surname_input')
const inputTelefono = document.getElementById('telephone_input')
const inputEmail = document.getElementById('email_input')
const inputMensaje = document.getElementById('message_input')
const botonEnviar = document.getElementById('form_button')

botonEnviar.addEventListener('click', function(event) {
    event.preventDefault()
    guardarDatos()
})


// guardar datos en localstorage
function guardarDatos() {
    const datosContacto = {
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        telefono: inputTelefono.value,
        email: inputEmail.value,
        mensaje: inputMensaje.value
    }

    let resultadoDatos = JSON.stringify(datosContacto)
    localStorage.setItem('datosContacto', resultadoDatos)
    console.log('resultadoDatos')
}

