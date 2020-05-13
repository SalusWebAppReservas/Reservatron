let progreso = document.querySelectorAll('.registro__pasos__paso');

function pasos(e) {
    let element = e.target;
    let btnSiguiente = element.classList.contains('btn-suiguiente');
    if (btnSiguiente) {
        let pasoActual = document.getElementById('step-' + element.dataset.step);
        let siguientePaso = document.getElementById('step-' + element.dataset.to_step);
        pasoActual.addEventListener('animationend', function callback() {
            pasoActual.classList.remove('active');
            siguientePaso.classList.add('active');
            if (btnSiguiente) {
                pasoActual.classList.add('para_la_izquierda');
                progreso[element.dataset.to_step - 1].classList.add('active');
            } else {
                siguientePaso.classList.remove('para_la_izquierda');
                progreso[element.dataset.step - 1].classList.remove('active');
            }
            pasoActual.removeEventListener('animationend', callback);
        });
    }
}

document.getElementById('registro').addEventListener('click', pasos);
