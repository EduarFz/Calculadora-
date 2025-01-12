

// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Referencia a la pantalla
    const pantalla = document.getElementById("pantalla");

    pantalla.textContent="0";

    // Variable para controlar si el punto ya fue ingresado
    let puntoIngresado = false;

     // Función para agregar contenido a la pantalla
  const agregarPantalla = (contenido) => {
   
    // Si la pantalla tiene solo "0" y se escribe algo distinto a "."
    if (pantalla.textContent === "0") {
        if (contenido === ".") {
            pantalla.textContent = "0."; // Inicia un número decimal
            puntoIngresado = true; // Marca que se ingresó un punto
        } else {
            pantalla.textContent = contenido; // Reemplaza el "0" inicial
        }
    } else if (contenido === "." && !puntoIngresado) {
        pantalla.textContent += contenido; // Agrega el punto si no se ha ingresado
        puntoIngresado = true; // Marca que el punto ya fue ingresado
    } else if (contenido !== ".") {
        pantalla.textContent += contenido; // Agrega otros contenidos
    }
};
   
    // Función para borrar el último carácter (LIFO)
    const borrarUltimo = () => {
        const textoActual = pantalla.textContent;
        if (textoActual.length > 1) {
            const ultimoCaracter = textoActual.slice(-1);
            pantalla.textContent = textoActual.slice(0, -1); // Elimina el último carácter

            // Si el último carácter eliminado era un punto, permite ingresarlo de nuevo
            if (ultimoCaracter === ".") {
                puntoIngresado = false;
            }
        } else {
            pantalla.textContent = "0"; // Si queda un solo carácter, resetea a "0"
            puntoIngresado = false; // Resetea el control del punto
        }
    };

    // Función para limpiar toda la pantalla
    const limpiarPantalla = () => {
        pantalla.textContent = "0";
        puntoIngresado = false; // Resetea el control del punto
    };

    // Función para calcular el resultado
    const calcularResultado = () => {
        const expresion = pantalla.textContent;

        try {
            // Reemplaza "^" por "**" porque math.js entiende "^" como potencia
            const expresionEvaluable = expresion.replace(/\^/g, "**");
            const resultado = math.evaluate(expresionEvaluable);

            // Muestra el resultado en pantalla
            pantalla.textContent = resultado;
            puntoIngresado = false; // Resetea el control del punto
        } catch (error) {
            pantalla.textContent = "Error"; // Muestra "Error" si la expresión no es válida
        }
    };

    function mostrarAlerta() {
        alert("¡Aun no funciona esta vaina!");
        
    }

    // Manejar clics en los botones
    const botones = document.querySelectorAll(".boton");
    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = boton.id;

            if (id === "clear") {
                limpiarPantalla(); // Limpia la pantalla
            } else if (id === "borrar") {
                borrarUltimo(); // Borra el último carácter
            } else if (id === "igual") {
                calcularResultado(); // Calcula el resultado
            } else if (id === "potencia") {
                // agregarPantalla("^"); // Muestra el símbolo de potencia
                mostrarAlerta();
            } else if (id === "division") {
                agregarPantalla("/"); // division
            } else if (id === "multiplicacion") {
                agregarPantalla("*"); // multiplicacion
            } else if (id === "raiz") {
                // agregarPantalla("sqrt"); // raiz
                mostrarAlerta();
            } else {
                agregarPantalla(boton.textContent); // Agrega el contenido del botón
            }
        });

        // Evita que el botón se presione varias veces al mantenerlo presionado
        boton.addEventListener("mousedown", (e) => e.preventDefault());
    });
});


