const express = require('express');
const fs = require('fs/promises')
const path = require('path')


const app = express();
const port = 3000;
const pathToFile = path.join(__dirname,"db.json");
exports.pathToFile = pathToFile;
const cache = new Map()

// app.use(express.json())

async function readfile(){
    try{
        let data = await fs.readFile(pathToFile,'utf-8')
        return JSON.parse(data)
    }catch(err){
        console.log(err)
    }
}
async function readFileWithDelay(){
    try{
        await new Promise((res,rej)=>{
            setTimeout(res,1500);
        });

        let data = await readfile()
        return data
    }catch(err){
        console.log(err)
    }
}

app.get('/products',async (req, res) => {
    try{
        let key = req.url;
        let value = cache[key];
        if (value){
            res.set("X-Cache","HIT")
            return res.json(value);;
         // key = /products, value = {/products:[]}
        }
    let products = await readFileWithDelay();
    cache[key] = products;
    res.set("X-Cache","MISS")
    res.json(products)
    }catch(err){
        res.status(500).send("Server Error");
    }
});
app.get('/products/:id',async (req,res)=>{
    try{
        let {id} = req.params;
        id = Number(id);
        let products = await readFileWithDelay();
        let product = products.find(item => item.id === id);
        res.json(product);
    }catch(err){
        console.log(err);
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})