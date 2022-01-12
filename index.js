const inquirer = require('inquirer');
//const mysql = require('mysql2');
const db = require('./db/connection');
const cTable = require('console.table');

db.connect(err => {
    if (err) throw err;
    console.log('Connected to employee tracker database.');
    startMenu();
});

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'SQLPassword769',
//         database: 'tracker'
//     },
//     console.log('Connected to the employee tracker')
// );

const startMenu = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department',
            'add a role', 'add an employee', 'update an employee role', 'quit']
        }
    ).then(response => {
        if (response.mainMenu === 'view all departments') {
            viewDepartments();
        } else if (response.mainMenu === 'view all roles') {
            viewRoles();
        } else if (response.mainMenu === 'view all employees') {
            viewEmployees();
        } else if (response.mainMenu === 'add a department') {
            addDepartment();
        } else if (response.mainMenu === 'add a role') {
            addRole();
        } else if (response.mainMenu === 'add an employee') {
            addEmployee();
        } else if (response.mainMenu === 'update an employee role') {
            updateEmployeeRole();
        } else {
            quit();
        }
    });
};

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('\n');
        console.table(rows);
        startMenu();
    });
    
};

const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('\n');
        console.table(rows);
        startMenu();
    });
    
};

const viewEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('\n');
        console.table(rows);
        startMenu();
    });
    
};

const addDepartment = () => {
    inquirer.prompt(
        {
            name: 'dept_name',
            type: 'input',
            message: 'What is the name of the department you would like to add?'
        }
    ).then(response => {
        const sql = `INSERT INTO departments (name) VALUES (?)`
        const dept_name = response.dept_name;

        db.query(sql, dept_name, (err, result) => {
            if (err) {
                throw err;
            }
            console.log('Department added!');
            viewDepartments();
        });
    });
};

const addRole = () => {
    db.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err; 
        const departmentList = res.map (department => {
            return {
                name: department.name, 
                value: department.id
            }
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'title', 
                message: 'What is the name of the new role you would like to add?'
            }, 
            {
                type: 'input', 
                name: 'salary', 
                message: 'What is the salary for this new role?'
            },
            {
                type: 'list',
                name: 'department_id', 
                message: 'Which department will this role be added to?', 
                choices: departmentList
            }])
            .then(response => {
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`
                const params = [
                    response.title, 
                    response.salary, 
                    response.department_id
                ];
                db.query(sql, params, (err, result) => {
                    if (err) {
                        throw err; 
                    }
                    console.log('New role added!')
                    startMenu();
                });
            });
    });
};


const addEmployee = () => {
    // query to get all roles
    db.query('SELECT * FROM roles', (err, rows) => {
        if (err) throw err;
        const roles = rows.map( role => {
            return {
                name: role.title, 
                value: role.id
            }
        })
        db.query('SELECT * FROM employees', (err, rows) => {
            if (err) throw err;
            const nullManager = {
                name: 'null', 
                value: null
            };
            const managers = rows.filter( employee => employee.manager_id === null);
            const managersList = managers.map(manager => {
                return {
                    name: manager.first_name + ' ' + manager.last_name, 
                    value: manager.id
                }
            })
            // add option for no manager
            managersList.push(nullManager);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName', 
                    message: "What is the employee's first name?"
                }, 
                {
                    type: 'input',
                    name: 'lastName', 
                    message: "What is the new employee's last name?"
                }, 
                {
                    type: 'list', 
                    name: 'title',
                    message: "What is the employee's role?",
                    choices: roles
                }, 
                {
                    type: 'list', 
                    name: 'manager', 
                    message: 'Who is the manager of the new employee?', 
                    choices: managersList,
                }
            ])
            // query to INSERT into employees : first_name, last_name, role_id, manager_id
            .then(response => {
                const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                            VALUES (?, ?, ?, ?)`;
                const params = [response.firstName, response.lastName, response.title, response.manager];
                db.query(sql, params, (err, result) => {
                    if (err) throw err; 
                    console.log('New employee added!');
                    startMenu();
                })
            });
        });
    });
};

const updateEmployee = () => {
    db.query('SELECT * FROM roles', (err, rows) => {
        if (err) throw err; 
        const rolesList = rows.map( role => {
            return {
                name:role.title, 
                value: role.id
            }
        })
        db.query('SELECT * FROM employees', (err, rows) => {
            if (err) throw err;
            const employeeList = rows.map (employee => {
                return {
                    name: employee.first_name + ' ' + employee.last_name, 
                    value: employee.id
                }
            })
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee', 
                    message:'What is the name of the employee you would like to update?', 
                    choices: employeeList
                }, 
                {
                    type: 'list', 
                    name: 'newTitle', 
                    message: 'What new title will this employee hold?',
                    choices: rolesList
                }
            ])
            .then(response => {
                const sql = `UPDATE employees SET role_id = ? WHERE id = ?`
                const params = [
                    response.newTitle, 
                    response.employee
                ]
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log ('Employee role updated!');
                    startMenu();
                })
            })
        }); 
    });
};