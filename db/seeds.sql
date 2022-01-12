INSERT INTO departments (name)
VALUES
    ('Legal'),
    ('Engineering'),
    ('Sales'),
    ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lawyer', 150000.00, 1),
    ('Paralegal', 70000.00, 1),
    ('Full Stack Web Developer', 1000000.00, 2),
    ('Front End Web Developer', 999999.00, 2),
    ('Back End Web Developer', 999999.99, 2),
    ('Sales Lead', 100000.00, 3),
    ('Junior Salesman', 45000.00, 3),
    ('Sales Manager', 130000.00, 3),
    ('Marketing Director', 120000.00, 4),
    ('Marketing Assistant', 50000.00, 4),
    ('Marketing Intern', 0.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Tim', 'Hornick', 1, NULL),
    ('Bharata', 'Haywood', 2, 1),
    ('Christine', 'Amundsen', 3, 1),
    ('Sofiya', 'Starosta', 4, NULL),
    ('Eda', 'McNeill', 5, 4),
    ('Lara', 'Otieno', 6, 4),
    ('Virginia', 'Babin', 7, 4),
    ('Margaretha', 'Anson', 8, NULL),
    ('Rico', 'Orlov', 9, 8),
    ('Maja', 'Darby', 10, 8),
    ('Gert', 'Mooney', 11, 8);
