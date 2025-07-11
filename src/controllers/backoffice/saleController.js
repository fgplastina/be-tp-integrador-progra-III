import * as saleModel from '../../models/saleModel.js';
import * as productModel from '../../models/productModel.js';

// Listado
export const listSales = async (req, res) => {
  const sales = await saleModel.getAllSales();
  res.render('backoffice/sales/list', { sales });
};

// Detalle
export const viewSaleDetail = async (req, res) => {
  const { sale, items } = await saleModel.getSaleDetails(req.params.id);
  if (!sale) return res.status(404).send('Venta no encontrada');
  res.render('backoffice/sales/detail', { sale, items });
};

// Eliminar
export const deleteSale = async (req, res) => {
  await saleModel.deleteSale(req.params.id);
  res.redirect('/backoffice/sales');
};

// Formulario de creación de venta
export const renderCreateSaleForm = async (req, res) => {
  const products = await productModel.getAllProducts();
  res.render('backoffice/sales/form', {
    sale: null,
    items: [],
    products,
    formAction: '/backoffice/sales/create',
  });
};

// Formulario de edición de venta
export const renderEditSaleForm = async (req, res) => {
  const sale = await saleModel.getSaleById(req.params.id);
  const items = await saleModel.getItemsBySaleId(req.params.id);
  const products = await productModel.getAllProducts();

  if (!sale) {
    return res.status(404).send('Venta no encontrada');
  }

  res.render('backoffice/sales/form', {
    sale,
    items,
    products,
    formAction: `/backoffice/sales/${req.params.id}/edit`,
  });
};

// Crear venta
export const createSale = async (req, res) => {
  try {
    const { items = [] } = req.body;

    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const productId = parseInt(item.product_id);
      const quantity = parseInt(item.quantity);

      const product = await productModel.getProductById(productId);
      if (!product) continue;

      const unit_price = product.price;
      total += quantity * unit_price;

      validatedItems.push({ product_id: productId, quantity, unit_price });
    }

    const saleId = await saleModel.createSale(total, validatedItems);

    res.redirect('/backoffice/sales');
  } catch (error) {
    console.error('Error al crear la venta:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Actualizar venta
export const updateSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    const { items = [] } = req.body;

    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const productId = parseInt(item.product_id);
      const quantity = parseInt(item.quantity);

      const product = await productModel.getProductById(productId);
      if (!product) continue;

      const unit_price = product.price;
      total += quantity * unit_price;

      validatedItems.push({ product_id: productId, quantity, unit_price });
    }

    await saleModel.updateSale(saleId, { total });

    await saleModel.updateSaleItems(saleId, validatedItems);

    res.redirect('/backoffice/sales');
  } catch (error) {
    console.error('Error al actualizar la venta:', error);
    res.status(500).send('Error interno del servidor');
  }
};
