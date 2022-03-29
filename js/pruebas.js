function probarValidarCantidadIntegrantes() {
    console.assert(validarCantidadIntegrantes("") === "El cuadro con la cantidad de integrantes no debe estar vacio", "Validar cantidad integrantes no validó que el cuadro no este vacío");

    console.assert(
        validarCantidadIntegrantes("asd") === "El cuadro con la cantidad de integrantes solo puede contener numeros",
        "Validar cantidad integrantes no validó que el cuadro contenga solo numeros"
    );

    console.assert(validarCantidadIntegrantes("1") === "", "Validar cantidad integrantes fallo con un valor correcto");
}

probarValidarCantidadIntegrantes();
