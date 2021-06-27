-- Widgets table tasks

-- Uncategorized
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('1', 'Wash dishes', null, false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('1', 'Buy some pizza', null, false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('2', 'Take out garbage', null, false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('3', 'Catch jellyfish with spongebob', null, false);

-- Book category
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('1', 'War and Peace', 'books', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('2', 'Ulysses', 'books', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('3', 'The Lord of the Rings', 'books', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('3', 'The Golden Compass', 'books', true);

-- Film category
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('1', 'The Shawshank Redemption', 'films', true);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('2', 'Iron Man', 'films', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('2', 'Iron Man 2', 'films', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('3', `Schindler's List`, 'films', false);

-- Restaurant category
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('1', `McDonald's`, 'restaurants', true);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('3', 'Burger King', 'restaurants', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('3', 'shake shack', 'restaurants', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('3', 'dairy queen', 'restaurants', false);

-- Product category
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('1', `Banana`, 'products', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('1', 'apple', 'products', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('3', 'ps5', 'products', false);
INSERT INTO tasks (owner_id, description, category, completed)
VALUES ('3', 'mouse pad', 'products', false);
