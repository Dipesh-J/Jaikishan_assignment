const express= require('express')
const router= express.Router()
const customercontroller= require('../controllers/customercontroller')
const cardcontroller= require('../controllers/cardcontroller')
const {middleware}= require("../midddleware/auth.js")

//............................................................................. CUSTOMER API ...............................................................
router.post('/createCustomer', customercontroller.createCustomer)
router.get('/getCustomer', customercontroller.getCustomers)
router.delete('/deleteCustomer',middleware, customercontroller.deleteCustomer)

//............................................................................. CARD API ...............................................................
router.post('/createCard', cardcontroller.createCard)
router.get('/getCard', cardcontroller.getCards)

//............................................................................. PATH NOT FOUND ...............................................................
router.all('/*', function(req, res){
    return res.status(404).send({status:false, message:"invalid path/path not found"})
})
module.exports=router