function getCarHtml(car) {
  const div = document.createElement('div');
  div.classList.add('card');

  div.innerHTML = `
    <div class="card-body">
      <p>${car.brand}, ${car.year}. Power: ${car.hp} hP</p>
      <div class="select-wrapper"></div>
    </div>`;


  if (car.owner !== null) {
    const soldMessage = document.createElement('div');
    soldMessage.textContent = 'Reserved';
    soldMessage.style.color = 'red';
    div.append(soldMessage);
  }

  return div;
}

function getUserHtml(user) {
  const div = document.createElement('div');
  div.classList.add('card');

  div.innerHTML = `
    <div class="card-body">
      <p>${user.name}</p>
      <p>${user.age} y.o</p>
      <p>Cars: ${user
        .getCars()
        .reduce((acc, item) => `${acc ? acc + ', ' : ''}${item.brand}`, '')}
      </p>
      <div class="select-wrapper"></div>
    </div>
  `;
  return div;
}

/**
 * Create select to bind some object to another
 * @param {function} callback - callback to be called on select changes
 * @param {[{text, disabled: boolean, instance: object, id}]} options
 */
function appendSelectHtml(callback, options, parentEl, defaultOptionName) {
  const selectEl = document.createElement('select');
  selectEl.classList.add('form-select');

  selectEl.innerHTML += `<option value="">${defaultOptionName}</option>`;

  options.forEach(({ text, disabled }, index) => {
    selectEl.innerHTML += `<option value="${index}" ${
      disabled ? 'disabled' : ''
    }>${text}</option>`;
  });

  parentEl.append(selectEl);

  // on select call callback with instance
  selectEl.addEventListener('change', function (event) {
    callback(options[event.target.value].instance);

    options.forEach((item) => {
      if (item.instance.owner !== null) {
        item.disabled = true;
      }
    });

  });

  return selectEl;
}