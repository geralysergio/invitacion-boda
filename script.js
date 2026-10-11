/* =====================================================
   DATOS DEL INVITADO
===================================================== */

const invitado = {

    nombre: "Julieth Escudero",

    cupos: 3,

    /*
        false = NO tiene hospedaje
        true  = SÍ tiene hospedaje
    */

    hospedaje: false

};



/* =====================================================
   ELEMENTOS PRINCIPALES
===================================================== */

const entrada =
    document.getElementById("entrada");


const sobre =
    document.getElementById("sobreFull");


const abrirSobre =
    document.getElementById("abrirSobre");


const video =
    document.getElementById("videoBoda");


const musica =
    document.getElementById("musicaBoda");


const salmo =
    document.getElementById("salmoContenido");



/* =====================================================
   TEXTO DE CUPOS
===================================================== */

function textoLugares(cantidad) {

    if (cantidad === 1) {

        return "1 lugar";

    }

    return cantidad + " lugares";

}



/* =====================================================
   PERSONALIZAR INVITACIÓN
===================================================== */

document.getElementById(
    "nombreSobre"
).textContent =
    invitado.nombre;



document.getElementById(
    "cuposSobre"
).textContent =
    textoLugares(
        invitado.cupos
    );



document.getElementById(
    "cuposRsvp"
).textContent =
    textoLugares(
        invitado.cupos
    );



document.getElementById(
    "nombreFormulario"
).textContent =
    invitado.nombre;



document.getElementById(
    "cuposFormulario"
).textContent =
    textoLugares(
        invitado.cupos
    );



/* =====================================================
   GENERAR CANTIDAD DE PERSONAS
===================================================== */

const cantidadAsistentes =
    document.getElementById(
        "cantidadAsistentes"
    );


cantidadAsistentes.innerHTML = "";


for (
    let i = 1;
    i <= invitado.cupos;
    i++
) {

    const opcion =
        document.createElement(
            "option"
        );


    opcion.value = i;


    opcion.textContent =
        i === 1
            ? "1 persona"
            : i + " personas";


    cantidadAsistentes.appendChild(
        opcion
    );

}



/* =====================================================
   HOSPEDAJE
===================================================== */

const bloqueHospedaje =
    document.getElementById(
        "bloqueHospedaje"
    );


if (!invitado.hospedaje) {

    bloqueHospedaje
        .classList
        .add("oculto");

}



/* =====================================================
   ABRIR SOBRE
===================================================== */

let invitacionAbierta = false;



abrirSobre.addEventListener(
    "click",
    function () {


        if (invitacionAbierta) {

            return;

        }


        invitacionAbierta = true;



        /* -----------------------------------------
           ABRIR SOBRE
        ----------------------------------------- */

        sobre.classList.add(
            "abierto"
        );



        /* -----------------------------------------
           INICIAR MÚSICA

           Se ejecuta directamente desde
           el toque del usuario para mejorar
           compatibilidad con iPhone.
        ----------------------------------------- */

        musica.play().catch(
            function () {

                console.log(
                    "El navegador no permitió iniciar el audio."
                );

            }
        );



        /* -----------------------------------------
           INICIAR VIDEO
        ----------------------------------------- */

        video.play().catch(
            function () {

                console.log(
                    "El video no pudo iniciar."
                );

            }
        );



        /* -----------------------------------------
           MOSTRAR INVITACIÓN
        ----------------------------------------- */

        setTimeout(
            function () {


                entrada.classList.add(
                    "finalizada"
                );


                document.body
                    .classList
                    .remove(
                        "bloqueado"
                    );


                /*
                    Aquí comienzan:

                    - Salmo
                    - tres líneas
                    - formación del monograma
                */

                prepararHilosMonograma();

                salmo.classList.add(
                    "visible"
                );

                animarHilosMonograma();


            },
            1500
        );



        /* -----------------------------------------
           RETIRAR SOBRE
        ----------------------------------------- */

        setTimeout(
            function () {

                entrada.style.display =
                    "none";

            },
            2800
        );


    }
);



/* =====================================================
   PAUSAR AL SALIR
===================================================== */

document.addEventListener(
    "visibilitychange",
    function () {


        if (!invitacionAbierta) {

            return;

        }


        /*
            USUARIO SALE DE LA INVITACIÓN
        */

        if (document.hidden) {


            video.pause();


            musica.pause();


        } else {


            /*
                USUARIO REGRESA
            */

            video.play().catch(
                function () {}
            );


            musica.play().catch(
                function () {}
            );


        }


    }
);



/* =====================================================
   RESPALDO PARA SAFARI / IPHONE
===================================================== */

window.addEventListener(
    "pagehide",
    function () {


        if (!invitacionAbierta) {

            return;

        }


        video.pause();


        musica.pause();


    }
);



window.addEventListener(
    "pageshow",
    function () {


        if (!invitacionAbierta) {

            return;

        }


        video.play().catch(
            function () {}
        );


        musica.play().catch(
            function () {}
        );


    }
);



/* =====================================================
   CUENTA REGRESIVA
===================================================== */

const fechaBoda =
    new Date(
        2027,
        0,
        23,
        17,
        0,
        0
    );



function actualizarCountdown() {


    const ahora =
        new Date();


    const diferencia =
        fechaBoda.getTime()
        -
        ahora.getTime();



    if (diferencia <= 0) {


        document.getElementById(
            "dias"
        ).textContent =
            "000";


        document.getElementById(
            "horas"
        ).textContent =
            "00";


        document.getElementById(
            "minutos"
        ).textContent =
            "00";


        document.getElementById(
            "segundos"
        ).textContent =
            "00";


        return;

    }



    const dias =
        Math.floor(
            diferencia /
            (
                1000 *
                60 *
                60 *
                24
            )
        );



    const horas =
        Math.floor(
            (
                diferencia /
                (
                    1000 *
                    60 *
                    60
                )
            ) % 24
        );



    const minutos =
        Math.floor(
            (
                diferencia /
                (
                    1000 *
                    60
                )
            ) % 60
        );



    const segundos =
        Math.floor(
            (
                diferencia /
                1000
            ) % 60
        );



    document.getElementById(
        "dias"
    ).textContent =
        String(dias)
            .padStart(
                3,
                "0"
            );



    document.getElementById(
        "horas"
    ).textContent =
        String(horas)
            .padStart(
                2,
                "0"
            );



    document.getElementById(
        "minutos"
    ).textContent =
        String(minutos)
            .padStart(
                2,
                "0"
            );



    document.getElementById(
        "segundos"
    ).textContent =
        String(segundos)
            .padStart(
                2,
                "0"
            );

}



actualizarCountdown();


setInterval(
    actualizarCountdown,
    1000
);



/* =====================================================
   ANIMACIONES AL HACER SCROLL
===================================================== */

const elementosReveal =
    document.querySelectorAll(
        ".reveal"
    );



const observadorReveal =
    new IntersectionObserver(

        function (entradas) {


            entradas.forEach(
                function (elemento) {


                    if (
                        elemento.isIntersecting
                    ) {


                        elemento.target
                            .classList
                            .add(
                                "visible"
                            );


                        observadorReveal
                            .unobserve(
                                elemento.target
                            );


                    }


                }
            );


        },

        {

            threshold: 0.15

        }

    );



elementosReveal.forEach(
    function (elemento) {


        observadorReveal.observe(
            elemento
        );


    }
);



/* =====================================================
   RSVP
===================================================== */

const abrirRsvp =
    document.getElementById(
        "abrirRsvp"
    );


const modalRsvp =
    document.getElementById(
        "modalRsvp"
    );


const cerrarRsvp =
    document.getElementById(
        "cerrarRsvp"
    );


const cerrarFondo =
    document.getElementById(
        "cerrarFondo"
    );


const formRsvp =
    document.getElementById(
        "formRsvp"
    );



/* =====================================================
   ABRIR RSVP
===================================================== */

function mostrarRsvp() {


    modalRsvp
        .classList
        .add(
            "activo"
        );


    modalRsvp
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body.style.overflow =
        "hidden";

}



/* =====================================================
   CERRAR RSVP
===================================================== */

function ocultarRsvp() {


    modalRsvp
        .classList
        .remove(
            "activo"
        );


    modalRsvp
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body.style.overflow =
        "";

}



abrirRsvp.addEventListener(
    "click",
    mostrarRsvp
);



cerrarRsvp.addEventListener(
    "click",
    ocultarRsvp
);



cerrarFondo.addEventListener(
    "click",
    ocultarRsvp
);



/* =====================================================
   FORMULARIO DEMOSTRACIÓN
===================================================== */

formRsvp.addEventListener(
    "submit",
    function (evento) {


        evento.preventDefault();


        alert(
            "Esta es una demostración. Más adelante conectaremos este formulario con la lista real de invitados."
        );


    }
);

/* =====================================================
   TRES LÍNEAS DESDE ARRIBA QUE CONTINÚAN EN EL MONOGRAMA
===================================================== */
const dibujoMonograma = document.querySelector(".monograma-dibujo");
const hilosMonograma = [...document.querySelectorAll(".hilo-monograma")];
const mascarasMonograma = [...document.querySelectorAll(".mascara-trazo")];
const monogramaFinal = document.querySelector(".monograma-formado");
const recorridosOriginales = hilosMonograma.map(hilo => hilo.getAttribute("d"));

function prepararHilosMonograma() {
    const caja = dibujoMonograma.getBoundingClientRect();
    const inicioSeccion = document.getElementById("heroVideo").getBoundingClientRect().top;
    const arriba = (inicioSeccion - caja.top) * 2000 / caja.width - 100;
    hilosMonograma.forEach((hilo, indice) => {
        hilo.setAttribute("d", recorridosOriginales[indice]);
        const inicio = hilo.getPointAtLength(0);
        // El mismo recorrido baja desde el borde superior y sigue el trazo.
        const recorrido = `M${inicio.x},${arriba} L${inicio.x},${inicio.y} ` +
            recorridosOriginales[indice].replace(/^M\s*[-\d.]+[,\s]+[-\d.]+/, "");
        hilo.setAttribute("d", recorrido);
        mascarasMonograma[indice].setAttribute("d", recorrido);
        [hilo, mascarasMonograma[indice]].forEach(path => {
            const longitud = path.getTotalLength();
            path.style.strokeDasharray = longitud;
            path.style.strokeDashoffset = longitud;
            path.dataset.longitud = longitud;
        });
    });
}

function animarHilosMonograma() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        monogramaFinal.style.opacity = "1";
        return;
    }
    hilosMonograma.forEach((hilo, indice) => {
        const opciones = { duration: 5200, delay: 5200 + indice * 180,
            easing: "linear", fill: "forwards" };
        [hilo, mascarasMonograma[indice]].forEach(path => {
            path.style.visibility = "visible";
            path.animate([
                { strokeDashoffset: path.dataset.longitud },
                { strokeDashoffset: "0" }
            ], opciones);
        });
        // Los hilos se desvanecen cuando queda formado el símbolo exacto.
        hilo.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 900, delay: 10800, fill: "forwards"
        });
    });
    monogramaFinal.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 600, delay: 10800, fill: "forwards"
    });
}
