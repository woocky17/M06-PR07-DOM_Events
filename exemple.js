let segon = document.getElementById("segn");

segon.innerHTML = "Segon paràgraf";

segon.style.color = "red";

let primer = segon.previousElementSibling;

primer.innerHTML = "Primer paràgraf";

let create = document.getElementById("create");

//! Al tener dos onclick en el mismo botón el segundo sobreescribe el primero
//! mientras que el addEventListener añade el addEventListener sin sobreescribir el onclick
// create.onclick = function () {

let bool = true;

create.onclick = function () {
  document.getElementById("list").innerHTML =
    "<li>Element de la llista Patata</li>";
  bool = false;
};
create.addEventListener(
  "click",
  function () {
    alert("Has fet click");
    bool = false;
  },
  bool
);
// };

// let afegir = document.getElementById("create");

// afegir.onclick = function () {
//   let newElement = document.createElement("li");
//   newElement.textContent = "Nou element de la llista";
//   document.getElementById("list").appendChild(newElement);
// };
