fetch("http://localhost:3000/api/promotions")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    obtenerPromotions(data);
  })
  .catch((error) => {
    console.log(error);
  });

const obtenerPromotions = (data) => {
  const contenido = document.getElementById("promociones");
  data.forEach((promotion) => {
    contenido.innerHTML = `
            ${contenido.innerHTML}
            <tr>
            <input type="hidden" value="${promotion.id_promotion}">
                <td>${promotion.title}</td>
                <td>${promotion.description}</td>
                <td id="start_date" name="start_date">${promotion.start_date}</td>
                <td id="end_date" name="end_date" onloadeddata="limitarCaracteres()">${promotion.end_date}</td>
                <td>
                    <a href="vistaEditarPromociones.html?id=${promotion.id_promotion}">
                    <button class="btn btn-warning mt-2" title="Editar">
                    Editar
                    </button></a>
                    <a href="#">
                    <button class=" btn btn-danger mt-2" title="Eliminar" onclick='Borrar(${promotion.id_promotion})'>
                    Eliminar
                    </button></a>
                </td>
            </tr>
            `;
  });
};

const formElement = document.querySelector("form#registerPromotion");
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
    savePromotion(result);
  }
};

formElement.addEventListener("submit", handler);

const savePromotion = (data) => {
  fetch("http://localhost:3000/api/promotions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      parent.location.href = "vistaGetPromociones.html";
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
      fetch(`http://localhost:3000/api/promotions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          parent.location.href = "vistaGetPromociones.html";
        });
      Swal.fire(
        "Eliminado!",
        "El registro ha sido elimado correctamente.",
        "success"
      );
    }
  });
}
