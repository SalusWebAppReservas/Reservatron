export const selectOption = (input, dbData, selectID, inputID) => {
    const select = document.getElementById(selectID);

    if (!input || !dbData) {
        select.innerHTML = '';
        select.size = 0;
        select.setAttribute('hidden', 'hidden');
        return;
    }

    const matchedUsers = dbData.filter((item) =>
        input === '*' ? item.fullName : item.fullName.toUpperCase().includes(input.toUpperCase())
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
            const inputClientName = document.getElementById(inputID);
            inputClientName.value = target.textContent;
            inputClientName.dataset['user_id'] = target.value;
            select.innerHTML = '';
            select.size = 0;
            select.setAttribute('hidden', 'hidden');
        }, 500);
    });
};
