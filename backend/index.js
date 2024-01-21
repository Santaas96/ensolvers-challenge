import server from "./src/server.js";
import { PORT } from "./src/config.js";
import { sequelize } from "./src/db/database.js";

const port = PORT || 3000;

// db sync & server bootstrap
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada correctamente");
    server.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });