module.exports = app => {
    require('./authRoutes')(app),
    require('./productRoutes')(app) 
    require('./productcategoryRoutes')(app) 
}