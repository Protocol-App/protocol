export function adminFirstNameValidator(firstName) {
    if (firstName) {
        return true;
    }
}

export function adminLastNameValidator(lastName) {
    if (lastName) {
        return true;
    }
}

export function adminEmailValidator(email) {
    if (email) {
        return true;
    }
}

export function adminEmailAtValidator(email) {
    if (email.includes('@')) {
        return true;
    } else return false
}

export function adminEmailDotValidator(email) {
    if (email.includes('.')) {
        return true;
    } else return false
}

export function adminEmailSpaceValidator(email) {
    if (email.includes(' ')) {
        return false;
    } else return true
}