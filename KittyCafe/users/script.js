fetch("http://localhost:3000/api/users")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    obtenerUsers(data);
  })
  .catch((error) => {
    console.log(error);
  });

const obtenerUsers = (data) => {
  const contenido = document.getElementById("usuarios");
  data.forEach((user) => {
    contenido.innerHTML = `
            ${contenido.innerHTML}
            <tr>
            <input type="hidden" value="${user.id_user}">
                <td>${user.username}</td>
                <td>${user.id_role}</td>
                <td>${user.status}</td>
                <td>${user.email}</td>
                <td>${user.phone_number}</td>
                <td>
                    <a href="vistaEditarUsuario.html?id=${user.id_user}">
                    <button class="btn btn-warning mt-2" title="Editar">
                    Editar
                    </button></a>
                    <a href="#">
                    <button class=" btn btn-danger mt-2" title="Eliminar" onclick='Borrar(${user.id_user})'>
                    Eliminar
                    </button></a>
                </td>
            </tr>
            `;
  });
};

const formElement = document.querySelector("form#registerUser");
const getFormJSON = (form) => {
  const data = new FormData(form);

  return Array.from(data.keys()).reduce((result, key) => {
    result[key] = data.get(key);
    return result;
  }, {});
};

const handler = (event) => {
  event.preventDefault();
  const valid = formElement.reportValidity();

  if (valid) {
    const result = getFormJSON(formElement);
    console.log(result);
    saveClient(result);
  }
};

formElement.addEventListener("submit", handler);

const saveClient = (data) => {
  fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      parent.location.href = "vistaGetUsuarios.html";
    })
    .catch((error) => {
      console.log(error);
    });
};

function Borrar(id) {
  Swal.fire({
    title: "¿Est&aacute; seguro de eliminar el registro?",
    html: "No podr&aacute; recuperar el registro",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DB0F0F",
    cancelButtonColor: "#FFDC00",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          parent.location.href = "vistaGetUsuarios.html";
        });
      Swal.fire(
        "Eliminado!",
        "El registro ha sido elimado correctamente.",
        "success"
      );
    }
  });
}
