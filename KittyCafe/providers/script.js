fetch("http://localhost:3000/api/providers")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    obtenerProveedores(data);
  })
  .catch((error) => {
    console.log(error);
  });
const obtenerProveedores = (data) => {
  const contenido = document.getElementById("proveedores");
  data.forEach((provider) => {
    contenido.innerHTML = `
            ${contenido.innerHTML}
            <tr>
            <td>${provider.fullname}</td>
                <td>${provider.address}</td>
                <td>${provider.phone_number}</td>
                <td>${provider.provides}</td>
                <td>
                    <a href="vistaEditarProveedor.html?id=${provider.id_provider}">
                    <button class="btn btn-warning mt-2" title="Editar" >
                    Editar
                    </button></a>
                    <button class=" btn btn-danger mt-2" title="Eliminar" onclick='Borrar(${provider.id_provider})'>
                    Eliminar
                    </button>
                </td>
            </tr>
            `;
  });
};

const formElement = document.querySelector("form#registerProvider");
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
    saveProvider(result);
  }
};

formElement.addEventListener("submit", handler);

const saveProvider = (data) => {
  fetch("http://localhost:3000/api/providers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      parent.location.href = "vistaGetProveedores.html";
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
      fetch(`http://localhost:3000/api/providers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          parent.location.href = "vistaGetProveedores.html";
        });
      Swal.fire(
        "Eliminado!",
        "El registro ha sido elimado correctamente.",
        "success"
      );
    }
  });
}
