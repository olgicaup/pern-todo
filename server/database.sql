\c perntodo;

CREATE TABLE IF NOT EXISTS todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);