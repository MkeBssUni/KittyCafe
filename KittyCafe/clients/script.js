fetch("http://localhost:3000/api/clients")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    obtenerClientes(data);
  })
  .catch((error) => {
    console.log(error);
  });
const obtenerClientes = (data) => {
  const contenido = document.getElementById("clients");
  data.forEach((client) => {
    contenido.innerHTML = `
            ${contenido.innerHTML}
            <tr>
            <td>${client.fullname}</td>
            <td>${client.email}</td>
            <td>${client.visits}</td>
            <td>
                <a href="vistaEditarCliente.html?id=${client.id_client}">
                <button class="btn btn-warning mt-2" title="Editar">
                    Editar
                </button></a>
                <a href="#">
                <button class=" btn btn-danger mt-2" title="Eliminar" onclick='Borrar(${client.id_client})'>
                    Eliminar
                </button></a>
            </td>
            </tr>
            `;
  });
};

const formElement = document.querySelector("form#registerClient");
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
  fetch("http://localhost:3000/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      parent.location.href = "vistaGetClientes.html";
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
        fetch(`http://localhost:3000/api/clients/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            parent.location.href = "vistaGetClientes.html";
          });
        Swal.fire(
          "Eliminado!",
          "El registro ha sido elimado correctamente.",
          "success"
        );
      }
    });
  }


