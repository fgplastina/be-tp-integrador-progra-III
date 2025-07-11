document.addEventListener('DOMContentLoaded', () => {
  const itemsBody = document.getElementById('items-body');
  const addItemBtn = document.getElementById('add-item');
  const totalDisplay = document.getElementById('total-amount');

  // Actualiza subtotal y total
  const updateTotals = () => {
    let total = 0;
    document.querySelectorAll('#items-body tr').forEach((row) => {
      const qty = parseFloat(row.querySelector('.quantity-input')?.value) || 0;
      const unitPrice = parseFloat(row.querySelector('.unit-price')?.value) || 0;
      const subtotal = qty * unitPrice;

      row.querySelector('.subtotal').textContent = subtotal.toFixed(2);
      total += subtotal;
    });
    totalDisplay.textContent = total.toFixed(2);
  };

  // Agrega un nuevo ítem al formulario
  const addItemRow = () => {
    const index = itemsBody.querySelectorAll('tr').length;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <select name="items[${index}][product_id]" class="product-select">
          ${products
            .map(
              (p) => `
            <option value="${p.id}" data-price="${p.price}">${p.name}</option>
          `
            )
            .join('')}
        </select>
      </td>
      <td><input type="number" name="items[${index}][quantity]" value="1" min="1" class="quantity-input" required></td>
      <td><input type="text" name="items[${index}][unit_price]" value="${products[0].price}" readonly class="unit-price"></td>
      <td><span class="subtotal">${products[0].price.toFixed(2)}</span></td>
      <td><button type="button" class="remove-row">🗑</button></td>
    `;

    itemsBody.appendChild(row);
    updateTotals();
  };

  // Evento: agregar ítem
  addItemBtn.addEventListener('click', () => {
    addItemRow();
  });

  // Delegación de eventos en tbody
  itemsBody.addEventListener('input', (e) => {
    if (e.target.classList.contains('quantity-input')) {
      updateTotals();
    }
  });

  itemsBody.addEventListener('change', (e) => {
    if (e.target.classList.contains('product-select')) {
      const selectedOption = e.target.selectedOptions[0];
      const price = parseFloat(selectedOption.dataset.price);
      const unitPriceInput = e.target.closest('tr').querySelector('.unit-price');

      unitPriceInput.value = price.toFixed(2);
      updateTotals();
    }
  });

  itemsBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-row')) {
      e.target.closest('tr').remove();
      updateTotals();
    }
  });

  // Inicial
  updateTotals();
});
