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
app.get('/friend/:id', (req, res) =>{
    let friendId = Number(req.params.id);
    let getFriend = friend.find((friend) => friend.id === friendId);
//send back an error message if the Friend id is not found
    if(!getFriend){
        res.status(404).send(`Cannot find friend with id of ${friendId}`);
    }else {
        res.json(getFriend);
    }});


    
app.listen(port, () => {
console.log(`SERVING ON on http://127.0.0.1:${port}`)})