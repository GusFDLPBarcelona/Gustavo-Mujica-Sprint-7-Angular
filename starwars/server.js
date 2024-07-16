const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json'); // Aquí se carga el archivo de base de datos JSON
const middlewares = jsonServer.defaults();

// Habilitar CORS
app.use(cors());

// Usar middlewares por defecto (logger, static, cors y no-cache)
app.use(middlewares);

// Configurar autenticación
app.db = router.db;
app.use(auth);

// Usar el router
app.use(router);
app.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});