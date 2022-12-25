const isValidName = (value)=>{
    const regex = /^[a-z ,.'-]+$/i
    
    if(regex.test(value)){
        return true
    }
    else {
        return false
    }
}

const isValidNumber = (value)=>{
    const regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    if(regex.test(value)){
        return true
    }
    else {
        return false
    }
}

const isValidDate = (value)=>{
    const regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
    if(regex.test(value)){
        return true
    }
    else {
        return false
    }
}

const isValidEmail = (value)=>{
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(regex.test(value)){
        return true
    }
    else {
        return false
    }
}

const isValidStatus = (value)=>{
    const regex = ["ACTIVE", "INACTIVE"]
    if(regex.includes(value)){
        return true
    }
    else {
        return false
    }
}








module.exports.isValidName= isValidName
module.exports.isValidNumber= isValidNumber
module.exports.isValidDate=isValidDate
module.exports.isValidEmail=isValidEmail
module.exports.isValidStatus= isValidStatus