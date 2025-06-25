import app from './app.js';
import environments from './config/environments.js';

const PORT = environments.port || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
