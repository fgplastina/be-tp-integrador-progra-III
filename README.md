# Backend tp-integrador-progra-III

### Instalación:

1. Clonar el repositorio de GitHub del proyecto `git clone https://github.com/fgplastina/be-tp-integrador-progra-III.git`.
2. Copiar el archivo `example.env` y renombrarlo como `.env`.
3. Configurar las variables de entorno necesarias en el archivo `.env` según las necesidades del entorno local.
4. Ejecutar el comando `npm install` para instalar las dependencias del proyecto.
5. Ejecutar el comando `npm run dev` para iniciar el servidor de desarrollo. **Requisito obligatorio**: tener mysql corriendo.

### Uso de example.env:

- El archivo `example.env` sirve como una plantilla para configurar las variables de entorno del proyecto.
- Contiene las variables comunes necesarias para la configuración del entorno, como HOST, etc.

### Endpoints expuestos:

- /sales
- /products
- /categories

### Vistas del backoffice:

El backoffice del proyecto incluye varias vistas que permiten la gestión de productos, categorías, ventas y usuarios:

**Vistas de productos:**

- `/backoffice/products`: Muestra la lista de productos.
- `/backoffice/products/create`: Permite crear un nuevo producto.
- `/backoffice/products/:id/edit`: Permite editar un producto existente.
- `/backoffice/products/:id/delete`: Permite eliminar un producto existente.

**Vistas de categorías:**

- `/backoffice/categories`: Muestra la lista de categorías.
- `/backoffice/categories/create`: Permite crear una nueva categoría.
- `/backoffice/categories/:id/edit`: Permite editar una categoría existente.
- `/backoffice/categories/:id/delete`: Permite eliminar un categoría existente.

**Vistas de ventas:**

- `/backoffice/sales`: Muestra la lista de ventas.
- `/backoffice/sales/create`: Permite crear una nueva venta.
- `/backoffice/sales/:id/edit`: Permite editar una venta existente.
- `/backoffice/sales/:id/delete`: Permite eliminar un venta existente.

**Vistas de usuarios:**

- `/backoffice/users`: Muestra la lista de usuarios.
- `/backoffice/users/create`: Permite crear un nuevo usuario.
- `/backoffice/users/:id/edit`: Permite editar un usuario existente.
- `/backoffice/users/:id/delete`: Permite eliminar un usuario existente.
