const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

//servidor
const app = express();


//enviar datos a POST REQUEST 
app.use(bodyParser.json());

//renderizar proyecto build en index.html

app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res)=> res.sendFile(__dirname + "/build/index.html"));
//conexion a mongodb, dos parametros, url y datos para mejor conexion a mongoose
mongoose.connect(
    process.env.MONGODB_URL || "mongodb://localhost/zzshowroom", {

useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology:true,

});
//creacion de modelo con 2 parametros, nombre de coleccion y lista de campos

//cuando se crea un nuevo producto en la bd, un nuevo id
//de shortid se genera
const Product = mongoose.model
("products", 
new mongoose.Schema({
    _id: {type:String, default: shortid.generate},
    title: String,
    image: String,
    descripcion:String,
    precio: Number,
    availableSizes:[String],

}));

// A P I


//acceso a db y tabla products
app.get("/api/products", async (req,res)=> {

//return de todos los productos 
//find es una promesa, para obtener los datos reales se usa:
//Async en app.get  & await en products 
const products = await Product.find({});
//envio de datos al cliente 
res.send(products);
});

//creacion de new product

//End Point
app.post("/api/products", async (req,res)=> {
    //creacion de un nuevo producto en la BD
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async(req,res)=>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);  
    //enviar info al usr.
    res.send(deletedProduct);
})


//modal para Ordenes

const Order = mongoose.model("order", new mongoose.Schema({
    _id:{
        type: String,
        default: shortid.generate,
    },
    email:String,
    name:String,
    address: String,
    total: Number,
    cartItems:[{
        _id: String,
        title: String,
        precio: Number,
        count: Number,
    },
  ],
}, 
  {
     //con timestamp se generan dos campos automaticamente: created y updated
    timestamps:true,
  } 
 )
);


app.post("/api/orders", async(req, res) => {

    if(
        !req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems

    ) {
        return res.send({ message: "Datos son requeridos."});
    }
    const order = await Order(req.body).save();
    res.send(order);
});


//API orders / pedidos 
app.get("/api/orders", async(req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});
app.delete("/api/orders", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
});

//lanzar el servidor con Express 5000 puerto por defecto
const port = process.env.port || 5000;
app.listen(port, ()=>  console.log("serve at http://localhost:5000"));