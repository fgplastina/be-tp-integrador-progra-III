import app from './app.js';
import environments from './config/environments.js';

const PORT = environments.port || 3000;
const HOST = environments.host || 'http://localhost';

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${HOST}:${PORT}`);
});
