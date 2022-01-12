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