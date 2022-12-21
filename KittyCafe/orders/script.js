fetch("http://localhost:3000/api/orders")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    obtenerOrdenes(data);
  })
  .catch((error) => {
    console.log(error);
  });
const obtenerOrdenes = (data) => {
  const contenido = document.getElementById("ordenes");
  data.forEach((order) => {
    contenido.innerHTML = `
            ${contenido.innerHTML}
            <tr>
            <input type="hidden" value="${order.id_order}">
                <td>${order.description}</td>
                <td>${order.date_order}</td>
                <td>${order.total}</td>
                <td>${order.cliente}</td>
                <td>${order.empleado}</td>
                <td>
                    <a href="vistaEditarPedido.html?id=${order.id}">
                    <button class="btn btn-warning mt-2" title="Editar">
                    Editar
                    </button></a>
                    <a href="#">
                    <button class=" btn btn-danger mt-2" title="Eliminar" onclick='Borrar(${order.id})'>
                    Eliminar
                    </button></a>
                </td>
            </tr>
            `;
  });
};

const formElement = document.querySelector("form#registerOrder");
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
    saveOrder(result);
  }
};

formElement.addEventListener("submit", handler);

const saveOrder = (data) => {
  fetch("http://localhost:3000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      parent.location.href = "vistaGetPedidos.html";
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
      fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          parent.location.href = "vistaGetPedidos.html";
        });
      Swal.fire(
        "Eliminado!",
        "El registro ha sido elimado correctamente.",
        "success"
      );
    }
  });
}
