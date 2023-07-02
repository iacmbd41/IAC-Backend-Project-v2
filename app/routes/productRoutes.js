const productController = require('../controllers/productController')
const { authJwt } = require('../middlewares')

module.exports = app => {
    app.get('/', [], productController.get),
    app.get('/product/:id', [], productController.getById)
    app.get('/product/category/:cateId', [], productController.getBycateId)
    app.post('/product', [authJwt.verifyToken], productController.create)
    app.put('/product/:id', [authJwt.verifyToken], productController.update)
    app.delete('/product/:id', [], productController.delete)
}