const {v4:uuidv4} = require("uuid")
const { isValidName, isValidStatus, isValidDate, isValidNumber, isValidEmail } = require('../validator/valids')
const cardmodel = require('../models/cardmodel')
const customerModel= require('../models/customermodel')


// ................................................................ POST API .........................................................

exports.createCustomer= async (req,res) => {
    try{
        let {firstName,lastName,address,mobileNumber,emailID,status,DOB} = req.body

        if(Object.keys(req.body).length == 0){
            return res.status(400).send({status:false, message:"All the fields are mandatory"})
        }
        if(!req.body.firstName){
            return res.status(400).send({status:false, message:"firstName is mandatory"})
        }
        if(!req.body.lastName){
            return res.status(400).send({status:false, message:"lastName is mandatory"})
        }
        if(!req.body.mobileNumber){
            return res.status(400).send({status:false, message:"moblileNumber is mandatory"})
        }
        if(!req.body.emailID){
            return res.status(400).send({status:false, message:"emailID is mandatory"})
        }
        
        //.............................................. validation starts ..........................................................
        
        if(!isValidName(req.body.firstName)){
            return res.status(400).send({status:false, message:"please provide valid firstName!"})
        }
        if(!isValidName(req.body.lastName)){
            return res.status(400).send({status:false, message:"please provide valid lastName!"})
        }
        if(!isValidNumber(req.body.mobileNumber)){
            return res.status(400).send({status:false, message:"please provide valid 10 digit indian mobile number!"})
        }
        if(!isValidEmail(req.body.emailID)){
            return res.status(400).send({status:false, message:"please provide valid emailId!"})
        }
        if(req.body.status){
        if(!isValidStatus(req.body.status)){
            return res.status(400).send({status:false, message:"please provide valid status like active and inactive!"})
        }}
        if(req.body.DOB){
        if(!isValidDate(req.body.DOB)){
            return res.status(400).send({status:false, message:"please provide valid date like 'yyyy-mm-dd' !"})
        }}
        req.body.DOB = Date.parse(DOB)
        if(await customerModel.findOne({emailID:req.body.emailID, mobileNumber:req.body.mobileNumber})){
            return res.status(409).send({status:false, message:"customer already registered with us."})
        }
        //.............................................. validation ends ..........................................................
        //.............................................. UUID .....................................................................   
        req.body.customerID= uuidv4()
        console.log(req.body)
        return res.status(201).send({status:true, message:"Success", data: await customerModel.create(req.body)})

    }
    catch(err){
         res.status(500).send(err.message)
    }
}


// ................................................................ GET API .........................................................


exports.getCustomers= async function(req,res){
    try{
        const fetchCustomers= await customerModel.find({status:"ACTIVE"})
        if(fetchCustomers.length>0){
        return res.status(200).send({status:true, message:"Success",count:fetchCustomers.length, data:fetchCustomers})
        }
        else{
        return res.status(404).send({status:false, message:"no data found"})
        }
    }
    catch(err){
        res.sendStatus(500)
    }
}

// ................................................................ DELETE API .........................................................


exports.deleteCustomer= async function(req,res){
    try{
         await customerModel.deleteOne({customerID:req.customer.customerID})
         await cardmodel.deleteOne({customerID:req.customer.customerID.customerID})
         return res.sendStatus(204)
        }
    catch(err){
        res.sendStatus(500)
    }
}