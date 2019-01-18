export function emailExist(email){
    if(email){
        return true
    }else return false
}
export function emailAt(email){
    if(email.includes('@')){
        return true
    }else return false
}
export function emailPeriod(email){
    if(email.includes('.')){
        return true
    }else return false
}
export function emailSpace(email){
    if(email.includes(' ')){
        return false
    }else return true
}
export function loginPassword(password){
    if(password){
        return true
    }else return false
}