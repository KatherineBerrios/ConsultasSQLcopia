// Importamos la biblioteca pg
const { Pool } = require('pg');

// Configuramos el pool de conexión
const pool = new Pool({
  user: 'usuario',
  host: 'localhost',
  database: 'musica',
  password: 'contraseña',
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


// Función asíncrona para ejecutar la consulta SQL
const obtenerArtistasYAlbumes = async () => {
  try {
    const consultaSQL = `
      SELECT artistas.nombre, albumes.titulo, albumes.fecha_lanzamiento
      FROM artistas
      JOIN albumes ON artistas.artista_id = albumes.artista_id;
    `;

    // Ejecutar la consulta
    const resultado = await pool.query(consultaSQL);

    // Imprimir los resultados
    console.log("Resultados de la consulta:");
    resultado.rows.forEach(row => {
      console.log(`${row.nombre} - ${row.titulo} - ${row.fecha_lanzamiento}`);
    });
  } catch (err) {
    // Manejar errores
    console.error('Error al ejecutar la consulta:', err);
  }
};

// Llamar a la función
obtenerArtistasYAlbumes();