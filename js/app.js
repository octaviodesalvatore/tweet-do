// Variables

const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listeners

eventListeners();
function eventListeners() {
  //Cunado el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  // cuando el documenta esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets") || []);
    crearHTML();
  });
}

// Funciones
function agregarTweet(e) {
  e.preventDefault();
  // Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;
  if (tweet === "") {
    mostrarError("El tweet no puede estar vacio");
    return; // evita que se ejecuta mas lineas de codigo y solo funciona dentro de una funcion
  }

  const tweetObj = {
    id: Date.now(),
    tweet: tweet, // Se podria quitar el :tweet, porque js lo entiendo como uno mismo
  };

  //Add al arreglo de tweets
  tweets = [...tweets, tweetObj];

  // Una vez agregado vamos a crear el HTML
  crearHTML();

  //Reiniciar formulario

  formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //iNSERTER en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  //Eliminar la alerta dps de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

//mOSTRAR UN LISTADO DE LOS TWEETS
function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((element) => {
      //aGREGAR Boton de elimianr
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      //Funcionar de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(element.id);
      };

      //Crear el HTML
      const li = document.createElement("li");
      //A;adir texto
      li.innerText = element.tweet;
      //ASIGNAR BOTON
      li.appendChild(btnEliminar);
      //insertarlo en el html
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//Agrega los tweets actuales a Storage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Limpiar html porque cuando usamos appenCHild se vuelven a crear los valores viejos

//Eliminar tweet

function borrarTweet(id) {
  //   console.log("borrando.");
  tweets = tweets.filter((tweet) => tweet.id !== id);
  //   console.log("borrando tweet");
  crearHTML();
}
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
