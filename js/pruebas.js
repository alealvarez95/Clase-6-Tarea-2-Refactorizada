function probarValidarCantidadIntegrantes() {
    console.assert(validarCantidadIntegrantes("") === "El cuadro con la cantidad de integrantes no debe estar vacio", "Validar cantidad integrantes no validó que el cuadro no este vacío");

    console.assert(
        validarCantidadIntegrantes("asd") === "El cuadro con la cantidad de integrantes solo puede contener numeros",
        "Validar cantidad integrantes no validó que el cuadro contenga solo numeros"
    );

    console.assert(validarCantidadIntegrantes("1") === "", "Validar cantidad integrantes fallo con un valor correcto");
}

probarValidarCantidadIntegrantes();

function probarValidarSalarioFamiliares() {
    console.assert(validarSalarioFamiliares("") === "El cuadro no debe estar vacio", "Validar salario familiares no validó que los cuadros no esten vacíos");

    console.assert(validarSalarioFamiliares("asd") === "El cuadro solo puede contener numeros", "Validar salario familiares no validó que los cuadros contengan solo numeros");

    console.assert(validarSalarioFamiliares("1") === "", "Validar salario familiares fallo con un valor correcto");
}

probarValidarSalarioFamiliares();

const SALARIOS = [5, 10, 15];

function probarCalcularSalarioMayor(salarios) {
    console.assert(calcularSalarioMayor(salarios) === 15, "Calcular salario mayor fallo al encontrar el salario mas alto");
}

probarCalcularSalarioMayor(SALARIOS);

function probarCalcularSalarioMenor(salarios) {
    console.assert(calcularSalarioMenor(salarios) === 5, "Calcular salario menor fallo al encontrar el salario mas bajo");
}

probarCalcularSalarioMenor(SALARIOS);

function probarCalcularPromedioSalarioAnual(salarios) {
    console.assert(calcularPromedioSalarioAnual(salarios) === 10, "Calcular promedio salario anual fallo al encontrar el promedio anual de los salarios");
}

probarCalcularPromedioSalarioAnual(SALARIOS);
