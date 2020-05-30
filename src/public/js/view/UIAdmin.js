export const selectOption = (name, dbData, selectID, inputID) => {
    const select = document.getElementById(selectID);
    const input = document.getElementById(inputID);

    if (!name || !dbData) {
        select.innerHTML = '';
        select.size = 0;
        select.setAttribute('hidden', 'hidden');
        return;
    }

    const matchedUsers = dbData.filter(
        (item) => name === '*' || item.fullName.toUpperCase().includes(name.toUpperCase())
    );

    let options = matchedUsers.reduce(
        (acc, item) => acc + `<li value="${item.ID}">${item.fullName}</li>`,
        ''
    );

    if (options.length === 0) {
        options = `<option disabled>No hay coincidencias</option>`;
    }

    select.innerHTML = options;
    select.size = options.length + 1;
    select.removeAttribute('hidden');
    select.selectedIndex = 0;

    select.addEventListener('click', ({ target }) => {
        target.classList.add('acr__li__active');
        setTimeout(() => {
            input.value = target.textContent;
            input.dataset['id'] = target.getAttribute('value');
            select.innerHTML = '';
            select.size = 0;
            select.setAttribute('hidden', 'hidden');
        }, 500);
    });
};

export const renderHours = (hours) => {
    const select = document.getElementById('horasDisponible');

    const options = hours.map(
        (hour) => `<option value="${hour}">${new Date(hour).getHours()}:00</option>`
    );

    options.unshift('<option value="0" selected disabled>Horas disponibles</option>');
    select.innerHTML = options;
};
