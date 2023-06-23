const categoryController = require('../controllers/productcategoryController')
const { authJwt } = require('../middlewares')

module.exports = app => {
    app.get('/productcategory', [], categoryController.get),
    app.get('/productcategory/:id', [], categoryController.getById)
    app.post('/productcategory', [authJwt.verifyToken], categoryController.create)
    app.put('/productcategory/:id', [authJwt.verifyToken], categoryController.update)
    app.delete('/productcategory/:id', [], categoryController.delete)
}