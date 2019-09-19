DROP DATABASE IF EXISTS city_explorer;

CREATE DATABASE city_explorer;

\c city_explorer;

DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    searchQuery VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT
);

INSERT INTO locations (searchQuery, latitude, longitude) VALUES ('seattle', 41.1, 41.1);