const findOne = (id) => {
  fetch(`http://localhost:3000/api/products/${id}`)    
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.getElementById("title").value = data.product[0].title;
    document.getElementById("description").value = data.product[0].description;
    document.getElementById("price").value = data.product[0].price;
    document.getElementById("stock").value = data.product[0].stock;
    document.getElementById("id_category").value = data.product[0].id_category;
  })
  .catch((error) => {
    console.log(error);
  });
};

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);
findOne(id);


const formElement = document.querySelector("form#updateProduct");
const getFormJSON = (form) => {
const data = new FormData(form);
return Array.from(data.keys()).reduce((result, key) => {
  result[key] = data.get(key);
  return result;
}, {});
};

const handlerUpdate = (event) => {
event.preventDefault();
const data = getFormJSON(formElement);
console.log(data);
updateElemento(data);
};
const updateElemento = (elemento) => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
 console.log(id);
 // we gonna send the id in req params
   fetch(`http://localhost:3000/api/products/${id}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(elemento),
   })
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
      
     })
     .catch((error) => {
       console.log(error);
       
     });

     parent.location.href = "vistaGetProductos.html";
 };

formElement.addEventListener("submit", handlerUpdate);