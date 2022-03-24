const express = require('express');
const app = express();


//run queries on the pool
const pool = require("./db")

app.use(express.json()) // -> req.body


// GET ALL item form cart based user id
app.get("/cart/:userId", async(req,res)=>{
    try {
        const {userId} = req.params
        const allProducts = await pool.query("SELECT * FROM cart Where userid=$1",[userId])
        res.json(allProducts.rows)

    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
}) 

// add item to cart
app.post('/cart/:userId', async(req,res)=>{
    try {
        const {userId} = req.params
        const {itemId, quantity} = req.body
        const newProduct = await pool.query("INSERT INTO cart(userId, itemId, quantity) VALUES ($1,$2,$3) RETURNING *",[userId,itemId,quantity])
        res.json(newProduct.rowCount)
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//UPDATE
app.put("/cart/:userId/:itemId",async(req,res)=>{
    try {
        const {userId, itemId} = req.params
        const{quantity} = req.body // SET

        await pool.query("UPDATE cart SET quantity = $1 WHERE userid = $2 and itemid = $3", [quantity,userId,itemId])

        res.json("Update Successful!")
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//DELETE
app.delete("/cart/:userId/:itemId", async(req,res)=>{
    try {
        const {userId, itemId} = req.params
        await pool.query("DELETE FROM cart WHERE userid=$1 and itemid=$2",[userId,itemId])

        res.json("Product was removed!")
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

app.get('/', function(req, res) {
    res.send('Hello world!')
}); 

app.listen(3050, () => {
    console.log('Server Started');
});
