document.addEventListener("DOMContentLoaded", () => {
    cargarAdministradores();

    const formulario = document.getElementById("formAdministrador");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const idAdmin = document.getElementById("idAdmin").value;

        if (idAdmin === "") {
            guardarAdministrador();
        } else {
            actualizarAdministrador();
        }
    });
});

// Ruta real según Swagger
const API_URL = "https://localhost:7244/api/Administradors";

// 1. LISTAR ADMINISTRADORES
function cargarAdministradores() {
    const tabla = document.getElementById("tablaAdministradores");

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al consultar administradores");
            }
            return response.json();
        })
        .then(administradores => {
            tabla.innerHTML = "";

            administradores.forEach(admin => {
                tabla.innerHTML += `
                    <tr>
                        <td>${admin.idAdmin}</td>
                        <td>${admin.nombre}</td>
                        <td>${admin.apellido}</td>
                        <td>${admin.correo}</td>
                        <td>
                            <button onclick="buscarAdministrador(${admin.idAdmin})">Editar</button>
                            <button onclick="eliminarAdministrador(${admin.idAdmin})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error("Error al cargar administradores:", error);
            tabla.innerHTML = `
                <tr>
                    <td colspan="5">No se pudieron cargar los administradores.</td>
                </tr>
            `;
        });
}

// 2. BUSCAR ADMINISTRADOR POR ID
function buscarAdministrador(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo buscar el administrador");
            }
            return response.json();
        })
        .then(admin => {
            document.getElementById("idAdmin").value = admin.idAdmin;
            document.getElementById("nombre").value = admin.nombre;
            document.getElementById("apellido").value = admin.apellido;
            document.getElementById("correo").value = admin.correo;
            document.getElementById("contrasena").value = admin["contraseña"];

            document.getElementById("btnGuardar").textContent = "Actualizar administrador";
        })
        .catch(error => {
            console.error("Error al buscar administrador:", error);
            alert("No se pudo cargar el administrador");
        });
}

// 3. GUARDAR ADMINISTRADOR
function guardarAdministrador() {
    const administrador = obtenerDatosFormulario();

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(administrador)
    })
    .then(async response => {
        const texto = await response.text();

        if (!response.ok) {
            console.error("Error del backend:", response.status, texto);
            throw new Error("No se pudo guardar el administrador");
        }

        alert("Administrador guardado correctamente");
        limpiarFormulario();
        cargarAdministradores();
    })
    .catch(error => {
        console.error("Error al guardar administrador:", error);
        alert("Error al guardar el administrador");
    });
}

// 4. ACTUALIZAR ADMINISTRADOR
function actualizarAdministrador() {
    const id = document.getElementById("idAdmin").value;
    const administrador = obtenerDatosFormulario();

    administrador.idAdmin = parseInt(id);

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(administrador)
    })
    .then(async response => {
        const texto = await response.text();

        if (!response.ok) {
            console.error("Error del backend:", response.status, texto);
            throw new Error("No se pudo actualizar el administrador");
        }

        alert("Administrador actualizado correctamente");
        limpiarFormulario();
        cargarAdministradores();
    })
    .catch(error => {
        console.error("Error al actualizar administrador:", error);
        alert("Error al actualizar el administrador");
    });
}

// 5. ELIMINAR ADMINISTRADOR
function eliminarAdministrador(id) {
    const confirmar = confirm("¿Seguro que deseas eliminar este administrador?");

    if (!confirmar) {
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(async response => {
        const texto = await response.text();

        if (!response.ok) {
            console.error("Error del backend:", response.status, texto);
            throw new Error("No se pudo eliminar el administrador");
        }

        alert("Administrador eliminado correctamente");
        cargarAdministradores();
    })
    .catch(error => {
        console.error("Error al eliminar administrador:", error);
        alert("Error al eliminar el administrador");
    });
}

// TOMAR DATOS DEL FORMULARIO
function obtenerDatosFormulario() {
    const idAdmin = document.getElementById("idAdmin").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    return {
        idAdmin: idAdmin === "" ? 0 : parseInt(idAdmin),
        correo: correo,
        nombre: nombre,
        "contraseña": contrasena,
        apellido: apellido,
        blogs: [],
        productos: []
    };
}

// LIMPIAR FORMULARIO
function limpiarFormulario() {
    document.getElementById("idAdmin").value = "";
    document.getElementById("formAdministrador").reset();
    document.getElementById("btnGuardar").textContent = "Guardar administrador";
}