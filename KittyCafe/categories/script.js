fetch("http://localhost:3000/api/categories")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    obtenerProveedores(data);
  })
  .catch((error) => {
    console.log(error);
  });
const obtenerProveedores = (data) => {
  const contenido = document.getElementById("categorias");
  data.forEach((category) => {
    contenido.innerHTML = `
            ${contenido.innerHTML}
            <tr>
            <td>${category.title}</td>
            <td></td>
            <td></td>
            <td>
                <a href="vistaEditarCategorias.html?id=${category.id_category}">
                <button class="btn btn-warning mt-2" title="Editar">
                    Editar
                </button></a>
                <a href="#">
                <button class=" btn btn-danger mt-2" title="Eliminar" onclick='Borrar(${category.id_category})'>
                    Eliminar
                </button></a>
            </td>
            </tr>
            `;
  });
};

const formElement = document.querySelector("form#registerCategory");
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
    saveCategory(result);
  }
};

formElement.addEventListener("submit", handler);

const saveCategory = (data) => {
  fetch("http://localhost:3000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      parent.location.href = "vistaGetCategorias.html";
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
      fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          parent.location.href = "vistaGetCategorias.html";
        });
      Swal.fire(
        "Eliminado!",
        "El registro ha sido elimado correctamente.",
        "success"
      );
    }
  });
}
