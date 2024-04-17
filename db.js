// Importamos la biblioteca pg
const { Pool } = require('pg');

// Configuramos el pool de conexión
const pool = new Pool({
  user: 'brayandiazc',
  host: 'localhost',
  database: 'musica',
  password: '1010051341Bd',
  port: 5432,
});

// Función asíncrona para probar la conexión
const conectarDB = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("Conexión exitosa, fecha y hora actuales:", res.rows[0]);
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
}

// Ejecutamos la función
conectarDB();


// Función para insertar un álbum utilizando consulta parametrizada
const insertarAlbum = async (artistaId, titulo, fechaLanzamiento, genero) => {
  const queryConfig = {
    text: 'INSERT INTO albumes (artista_id, titulo, fecha_lanzamiento, genero) VALUES ($1, $2, $3, $4)',
    values: [artistaId, titulo, fechaLanzamiento, genero],
  };

  try {
    const res = await pool.query(queryConfig);
    console.log("Álbum insertado correctamente.");
  } catch (err) {
    console.error('Error al insertar álbum:', err);
  }
}

// Ejemplo de uso de la función
insertarAlbum(1, 'Nuevo Álbum', '2024-01-01', 'Jazz');


// Función para obtener todos los registros de la tabla 'albumes' como arreglos
const obtenerAlbumesComoArreglo = async () => {
  const queryConfig = {
    rowMode: 'array',
    text: 'SELECT * FROM albumes',
  };

  try {
    const res = await pool.query(queryConfig);
    console.log("Registros de álbumes como arreglo:", res.rows);
  } catch (err) {
    console.error('Error al obtener álbumes:', err);
  }
}

// Ejecutamos la función
obtenerAlbumesComoArreglo();
