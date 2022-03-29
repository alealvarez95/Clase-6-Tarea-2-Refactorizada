/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

const $botonIntegrantesFamilia = document.querySelector("#boton-integrantes");
const $cuerpoPagina = document.querySelector("body");

function calcularSalarioMayor(salarios) {
    let salarioMayor = 0;

    for (i = 0; i < salarios.length; i++) {
        if (salarioMayor < salarios[i]) {
            salarioMayor = salarios[i];
        }
    }

    return salarioMayor;
}

function calcularSalarioMenor(salarios) {
    let salarioMenor = salarios[0];

    for (i = 1; i < salarios.length; i++) {
        if (salarioMenor > salarios[i]) {
            salarioMenor = salarios[i];
        }
    }

    return salarioMenor;
}

function calcularPromedioSalarioAnual(salarios) {
    let salariosTotales = 0;

    for (i = 0; i < salarios.length; i++) {
        salariosTotales += salarios[i];
    }

    return salariosTotales / salarios.length;
}

$botonIntegrantesFamilia.onclick = function () {
    const cantidadFamiliares = Number(document.querySelector("#cantidad-integrantes-familia").value);
    const nuevoForm = document.createElement("form");
    nuevoForm.onsubmit = function () {
        return false;
    };
    nuevoForm.setAttribute("id", "form-calculo-integrantes");

    for (i = 0; i < cantidadFamiliares; i++) {
        let numero = i + 1;

        const nuevoDiv = document.createElement("div");
        const nuevoInput = document.createElement("input");
        const nuevoLabel = document.createElement("label");
        const nuevoTexto = document.createTextNode(`Salario anual del familiar nº${numero}: `);

        nuevoInput.setAttribute("id", `salario${numero}`);
        nuevoInput.setAttribute("type", "number");
        nuevoInput.setAttribute("class", "salario");

        nuevoLabel.setAttribute("for", `salario${numero}`);
        nuevoLabel.appendChild(nuevoTexto);

        nuevoDiv.appendChild(nuevoLabel);
        nuevoDiv.appendChild(nuevoInput);

        nuevoForm.appendChild(nuevoDiv);
    }

    const nuevoDiv = document.createElement("div");

    const nuevoBoton = document.createElement("input");
    nuevoBoton.setAttribute("type", "submit");
    nuevoBoton.setAttribute("value", "Calcular");
    nuevoBoton.setAttribute("id", "boton-calcular-salario");

    const nuevoBotonReset = document.createElement("input");
    nuevoBotonReset.setAttribute("type", "button");
    nuevoBotonReset.setAttribute("value", "Volver a empezar");
    nuevoBotonReset.setAttribute("id", "boton-reset");

    nuevoDiv.appendChild(nuevoBoton);
    nuevoDiv.appendChild(nuevoBotonReset);
    nuevoForm.appendChild(nuevoDiv);
    $cuerpoPagina.appendChild(nuevoForm);

    const $botonCalcular = document.querySelector("#boton-calcular-salario");

    $botonCalcular.onclick = function () {
        const salariosFamiliares = document.querySelectorAll(".salario");

        const listaSalarios = [];

        for (i = 0; i < salariosFamiliares.length; i++) {
            if (salariosFamiliares[i].value === "") {
            } else {
                listaSalarios.push(Number(salariosFamiliares[i].value));
            }
        }

        const salarioAnualPromedio = calcularPromedioSalarioAnual(listaSalarios);

        document.querySelector("#mayor-salario-anual").innerHTML = `El salario anual mayor de la familia es de $${calcularSalarioMayor(listaSalarios)}.`;
        document.querySelector("#menor-salario-anual").innerHTML = `El salario anual menor de la familia es de $${calcularSalarioMenor(listaSalarios)}.`;
        document.querySelector("#salario-anual-promedio").innerHTML = `El salario anual promedio de la familia es de $${salarioAnualPromedio}.`;
        document.querySelector("#salario-mensual-promedio").innerHTML = `El salario mensual promedio de la familia es de $${salarioAnualPromedio / 12}.`;
    };

    const $botonReset = document.querySelector("#boton-reset");
    const $formCalculoIntegrantes = document.querySelector("#form-calculo-integrantes");

    $botonReset.onclick = function () {
        $cuerpoPagina.removeChild($formCalculoIntegrantes);

        document.querySelector("#mayor-salario-anual").innerHTML = ``;
        document.querySelector("#menor-salario-anual").innerHTML = ``;
        document.querySelector("#salario-anual-promedio").innerHTML = ``;
        document.querySelector("#salario-mensual-promedio").innerHTML = ``;
    };
};
