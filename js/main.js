const $formularioCantidad = document["formulario-cantidad-integrantes"];
const $cuerpoPagina = document.querySelector("body");
const $errores = document.querySelector("#errores");

function validarCantidadIntegrantes(cantidadFamiliares) {
    if (cantidadFamiliares.length === 0) {
        return "El cuadro con la cantidad de integrantes no debe estar vacio";
    } else if (!/^[0-9]+$/.test(cantidadFamiliares)) {
        return "El cuadro con la cantidad de integrantes solo puede contener numeros";
    } else {
        return "";
    }
}

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

function validarPrimerFormulario(event) {
    const cantidadFamiliares = document.querySelector("#cantidad-integrantes-familia").value;

    const validacionCantidadFamiliares = validarCantidadIntegrantes(cantidadFamiliares);

    const error = {
        "cantidad-integrantes-familia": validacionCantidadFamiliares,
    };

    const esExito = manejarErroresCantidad(error) === 0;

    if (esExito) {
        $formularioCantidad.className = "oculto";
        document.querySelector("#errores").className = "oculto";
        crearInputs();
    }

    event.preventDefault();
}

function manejarErroresCantidad(errores) {
    const keys = Object.keys(errores);
    let cantidadErrores = 0;

    keys.forEach(function (key) {
        const error = errores[key];

        if (error) {
            $formularioCantidad[key].className = "error";
            const $error = document.createElement("li");
            $error.innerText = error;
            $errores.appendChild($error);
            $errores.className = "";
            cantidadErrores++;
        } else {
            $formularioCantidad[key].className = "";
        }
    });

    return cantidadErrores;
}

$formularioCantidad.onsubmit = validarPrimerFormulario;

function crearInputs() {
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
}
