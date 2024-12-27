const db = require("../db");

const User = {
    createUser: (userData, callback) => {
        const sql = "CALL CreateUser(?, ?, ?, ?, ?)";
        db.query(sql, userData, callback);
    },
    getUserById: (id, callback) => {
        const sql = "CALL SelectUser(?)";
        db.query(sql, [id], callback);
    },
    
    updateUser: (userData, callback) => {
        const sql = "CALL UpdateUser(?, ?, ?, ?, ?)";
        db.query(sql, userData, callback);
    },
    deleteUser: (id, callback) => {
        const sql = "CALL DeleteUser(?)";
        db.query(sql, [id], callback);
    },
    findByMobile: (mobileNumber, callback) => {
        const sql = "SELECT * FROM users WHERE mobile_number = ?";
        db.query(sql, [mobileNumber], callback);
    },
};

module.exports = User;
