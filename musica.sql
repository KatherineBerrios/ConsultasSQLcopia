-- Crear base de datos
CREATE DATABASE musica;

-- Conectar a base de datos
\c musica

-- Crear tabla artistas
CREATE TABLE artistas (
    artista_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    pais VARCHAR(100),
    fecha_nacimiento DATE
);

-- Crear tabla albumes
CREATE TABLE albumes (
    album_id SERIAL PRIMARY KEY,
    artista_id INTEGER REFERENCES artistas(artista_id),
    titulo VARCHAR(255) NOT NULL,
    fecha_lanzamiento DATE,
    genero VARCHAR(100)
);

-- Insertar artistas
INSERT INTO artistas (nombre, pais, fecha_nacimiento) VALUES
('Carlos Santana', 'México', '1947-07-20'),
('Shakira', 'Colombia', '1977-02-02');

-- Insertar albumes
INSERT INTO albumes (artista_id, titulo, fecha_lanzamiento, genero) VALUES
(1, 'Supernatural', '1999-06-15', 'Rock'),
(2, 'El Dorado', '2017-05-26', 'Pop');

-- Join
SELECT artistas.nombre, albumes.titulo, albumes.fecha_lanzamiento
FROM artistas
JOIN albumes ON artistas.artista_id = albumes.artista_id;
