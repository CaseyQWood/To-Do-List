-- Drop and recreate Tasks table

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  completed BOOLEAN NOT NULL DEFAULT FALSE
);
