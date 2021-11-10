const express = require('express');
const repoContext = require('./repository/repository-wrapper');
const cors =require('cors');
const {validateProduct} = require('./middleware/product-validation');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000,function () {
    console.log('Server started. Listen on port 3000');
})
// tried with id 4 but only get the number 1
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = repoContext.products.findProductById(id);
    return res.send(product);
});

app.post('/api/products', [validateProduct], (req, res) => {
    const newProduct = req.body;
    const addedProduct = repoContext.products.createProduct(newProduct);
    return res.send(addedProduct);
});

app.put('/api/products/:id', [validateProduct], (req, res) => {
    const id = req.params.id;
    const productPropertiesToUpdate = req.body;
    const updatedProduct = repoContext.products.updateProduct(id, productPropertiesToUpdate)
    return res.send(updatedProduct);
});

app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const updatedDataSet = repoContext.products.deleteProduct(id);
    return res.send(updatedDataSet);
})