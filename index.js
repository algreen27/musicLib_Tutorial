const express = require('express');
const repoContext = require('./repository/repository-wrapper');

const app = express();

app.listen(3000,function () {
    console.log('Server started. Listen on port 3000');
})
// tried with id 4 but only get the number 1
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = repoContext.products.findProductById(id);
    return res.send(product);
});