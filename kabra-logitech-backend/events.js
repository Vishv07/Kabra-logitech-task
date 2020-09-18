 const EventEmitter = require('events');

const Vishv ="Vishv";

class sales extends EventEmitter{
    constructor(){
        super();
    }
}
const myEmitter = new sales();
myEmitter.on("sale", () =>{
    console.log("Yep there was a sale");
})

myEmitter.on("sale", () =>{
    console.log(`customer name:${Vishv}`);
})
myEmitter.on("sale", (stock) =>{            
    console.log(`Current Stock:${stock}`);
})

 myEmitter.emit("sale",9);