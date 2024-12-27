const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const userController = {
    
    getUser: (req, res) => {
        const userId = req.params.id;
        console.log(userId)
        User.getUserById(userId, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
           console.log(results[0])
            res.json(results[0]);
        });
    },
    
    register: async (req, res) => {
        try {
            const { firstName, lastName, mobileNumber, password } = req.body;
            
           
            User.findByMobile(mobileNumber, async (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                if (results.length > 0) {
                    return res.status(400).json({ error: "Mobile number already registered" });
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                const createdBy = "system";

                User.createUser([firstName, lastName, mobileNumber, hashedPassword, createdBy], (err, results) => {
                    if (err) return res.status(500).json({ error: err.message });
                    
                    
                    const token = jwt.sign(
                        { id: results.insertId },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    );
                    console.log(token);
                    res.status(201).json({
                        message: "User registered successfully",
                        token,
                        user: {
                            firstName,
                            lastName,
                            mobileNumber
                        }
                    });
                });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { mobileNumber, password } = req.body;

            User.findByMobile(mobileNumber, async (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                if (results.length === 0) {
                    return res.status(401).json({ error: "Invalid credentials" });
                }

                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(401).json({ error: "Invalid credentials" });
                }

              
                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

               
                res.json({
                    message: "Login successful",
                    token,
                    user: {
                        firstName: user.first_name,
                        lastName: user.last_name
                    }
                });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    



    updateUser: (req, res) => {
        const { id, firstName, lastName, mobileNumber } = req.body;
        const updatedBy = "system";

        User.updateUser([id, firstName, lastName, mobileNumber, updatedBy], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User updated successfully" });
        });
    },

    deleteUser: (req, res) => {
        const userId = req.params.id;

        User.deleteUser(userId, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User deleted successfully" });
        });
    },
    getUserByToken: (req, res) => {
        const userId = req.user.id;
    
        User.getUserById(userId, (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
          }
          const user = results[0];
          console.log(user);
          res.json({
            firstName: user.first_name,
            lastName: user.last_name,
          });
        });
      },
};

module.exports = userController;
