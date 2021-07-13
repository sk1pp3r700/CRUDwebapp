const express = require('express')
const app = express()
const port = 4000;
const{v4:uuidv4} = require('uuid')
const friend = require('./model/friendList.js')
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h2>FRIENDS LIST</h2>')})
//GET
app.get('/info', (req, res) =>{
    res.json(friend)})
//POST
app.post('/friend/add', (req, res) =>{
        if(!req.body.name || !req.body.age || !req.body.phone){
            res.status(400).send('invalid')
        }else{
let newFriend = {
        id: uuidv4(),
        // id: friend.length + 1,
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
    }
        friend.push(newFriend);
        res.json(friend)}})




//GET-SPECIFIC
app.get("/friend/:id", (req, res) =>{
    const {id} = req.params;
    getFriend = friend.find((friend) => friend.id === Number(id));
//send back an error message if the Friend id is not found
    if(!getFriend){
        res.status(404).send(`Cannot find friend with id of ${friendId}`);
    }else {
        res.json(getFriend);
    }});


//DELETE
// app.delete("/products/:id", (req, res) => {
//     const { id } = req.params;
// // find product by id
// const deleteProduct = Products.find((product) => product.id === Number(id));
// if (!deleteProduct) {
// return res
//             .status(404)
//             .json({ success: false, msg: `No product with id ${id}.` });
//         }
// // create new array with all products except the specified product
// Products = Products.filter((product) => product.id !== Number(id));
// return res.status(200).json({
// success: true,
// msg: `Product ${id} has been deleted.`,
// data: Products,
// });
// });

    
app.listen(port, () => {
console.log(`SERVING ON on http://127.0.0.1:${port}`)})