import * as productModel from '../../models/productModel.js';
import * as categoryModel from '../../models/categoryModel.js';

// Listado
export const listProducts = async (req, res) => {
  const products = await productModel.getAllProducts();
  console.log('Aca', products);
  res.render('backoffice/products/list', { products });
};

// Formulario de creación
export const renderCreateForm = async (req, res) => {
  const categories = await categoryModel.getAllCategories();
  res.render('backoffice/products/form', {
    product: null,
    categories,
    formAction: '/backoffice/products/create',
  });
};

// Crear
export const createProduct = async (req, res) => {
  const { name, description, price, category_id, image_url } = req.body;
  await productModel.createProduct({ name, description, price, category_id, image_url });
  res.redirect('/backoffice/products');
};

// Formulario de edición
export const renderEditForm = async (req, res) => {
  const product = await productModel.getProductById(req.params.id);
  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }
  const categories = await categoryModel.getAllCategories();
  res.render('backoffice/products/form', {
    product,
    categories,
    formAction: `/backoffice/products/${req.params.id}/edit`,
  });
};

// Editar
export const updateProduct = async (req, res) => {
  const { name, description, price, category_id, image_url } = req.body;
  await productModel.updateProduct(req.params.id, {
    name,
    description,
    price,
    category_id,
    image_url,
  });
  res.redirect('/backoffice/products');
};

// Eliminar
export const deleteProduct = async (req, res) => {
  await productModel.deleteProduct(req.params.id);
  res.redirect('/backoffice/products');
};
