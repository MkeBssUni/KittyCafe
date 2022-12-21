fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    obtenerProductos(data);
  })
  .catch((error) => console.log(error));

const obtenerProductos = (data) => {
  // Función para obtener los productos
  const contenido = document.getElementById("productos");
  data.forEach((producto) => {
    contenido.innerHTML = `
            ${contenido.innerHTML}
            <tr>
                <td>${producto.title}</td>
                <td>${producto.description}</td> 
                <td>${producto.stock}</td>
                <td>$${producto.price}</td>
                <td style="display:none">${producto.id}</td>

                <td>
                    <a href="vistaEditarProducto.html?id=${producto.id_product}">
                    <button class="btn btn-warning mt-2" title="Editar">
                    Editar
                    </button></a>
                    <a href="#">
                    <button class=" btn btn-danger mt-2" title="Eliminar" onclick='Borrar(${producto.id_product})'>
                    Eliminar
                    </button></a>
                </td>
            </tr>
            `;
  });
};

const formElement = document.querySelector("form#registerProduct");

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
  fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      parent.location.href = "vistaGetProductos.html";
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
      fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          parent.location.href = "vistaGetProductos.html";
        });
      Swal.fire(
        "Eliminado!",
        "El registro ha sido elimado correctamente.",
        "success"
      );
    }
  });
}
