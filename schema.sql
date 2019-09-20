DROP DATABASE IF EXISTS city_explorer;

CREATE DATABASE city_explorer;

\c city_explorer;

DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT
);

INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ('seattle', 'Seattle, WA, USA', 47.6062095, -122.3320708);
INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ('lynwood', 'Lynwood, CA, USA',33.930293, -118.2114603);
INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ('chicago', 'Chicago, IL, USA', 41.8781136, -87.6297982);
