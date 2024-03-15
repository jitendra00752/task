const Post = require("../models/posts.model.js");
const fs = require("fs"); 
const path = require('path');
const dirPath = path.join(__dirname, '../../DB');

const sales = require("../../DB/sales.json");

// Create and Save a new Post
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }

//     // Create a Post
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description,
//         published: req.body.published || false
//     });
//     // Save Post in the database
//     Post.create(post, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Post."
//             });
//         else res.send(data);
//     });
// };
// Retrieve all Post from the database (with condition).
exports.findAll = (req, res) => { 
    fs.readFile(dirPath+'/sales.json', function(err, data) {  
        // Check for errors 
        if (err) throw err;  
        const users = JSON.parse(data); 
        let filteredUsers = [];
        for (let i= 0; i<users.length; i++) {
            filteredUsers.push(users[i].State);
        }
        let stateArr = Array.from(new Set(filteredUsers)) 
        res.send(stateArr);
    });
};


exports.findMaxMinDate = (req, res) => { 
    const state = req.params.state;
    fs.readFile(dirPath+'/sales.json', function(err, data) { 
        if (err) throw err;  
       const users = JSON.parse(data);  
          let filteredData = users.filter(user => user.State === state);
          let orderDates = filteredData.map(user => user["Order Date"]);
          let shipDates = filteredData.map(user => user["Ship Date"]);
          
           // Find minimum Order Date and maximum Ship Date
           let minOrderDate = orderDates.sort(function(a,b){
            const date1 = new Date(a)
            const date2 = new Date(b)
            return date1 - date2;
          });
          let maxShipDate = shipDates.sort(function(a,b){
            const date1 = new Date(a)
            const date2 = new Date(b)
            return date1 - date2;
          });
        let minOrderDates = Array.from(new Set(minOrderDate));
        let maxShipDates = Array.from(new Set(maxShipDate))
        res.send({'form':minOrderDates,'to':maxShipDates});
    });
};

// Find a single Post with a id
// exports.findOne = (req, res) => {
//     Post.findById(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Post with id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error retrieving Post with id " + req.params.id
//                 });
//             }
//         } else res.send(data);
//     });
// };
// // find all published Post
// exports.findAllPublished = (req, res) => {
//     Post.getAllPublished((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving post."
//             });
//         else res.send(data);
//     });
// };

// // Update a Post identified by the id in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }
//     console.log(req.body);
//     Post.updateById(
//         req.params.id,
//         new Post(req.body),
//         (err, data) => {
//             if (err) {
//                 if (err.kind === "not_found") {
//                     res.status(404).send({
//                         message: `Not found Post with id ${req.params.id}.`
//                     });
//                 } else {
//                     res.status(500).send({
//                         message: "Error updating Post with id " + req.params.id
//                     });
//                 }
//             } else res.send(data);
//         }
//     );
// };
// // Delete a Post with the specified id in the request
// exports.delete = (req, res) => {
//     Post.remove(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Post with id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Could not delete Post with id " + req.params.id
//                 });
//             }
//         } else res.send({ message: `Post was deleted successfully!` });
//     });
// };
// // Delete all Post from the database.
// exports.deleteAll = (req, res) => {
//     Post.removeAll((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all Post."
//             });
//         else res.send({ message: `All Post were deleted successfully!` });
//     });
// };