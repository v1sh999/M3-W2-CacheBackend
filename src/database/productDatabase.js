const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, '../db.json');

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

module.exports = {
    readfile,
    readFileWithDelay
};