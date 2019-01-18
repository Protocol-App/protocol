const { adminFirstNameValidator,
    adminLastNameValidator,
    adminEmailValidator,
    adminEmailAtValidator,
    adminEmailDotValidator,
    adminEmailSpaceValidator } = require('../Logic/logic_dan')

describe('first name validator function', () => {
    test('test if first name exists', () => {
        expect(adminFirstNameValidator('Test')).toBe(true);
    })
})

describe('last name validator function', () => {
    test('test if last name exists', () => {
        expect(adminLastNameValidator('Test')).toBe(true);
    })
})

describe('email validator function', () => {
    test('test if email exists', () => {
        expect(adminEmailValidator('test@test.com')).toBe(true);
    })
    test('test if email has an @ symbol', () => {
        expect(adminEmailAtValidator('test@test.com')).toBe(true);
        expect(adminEmailAtValidator('testtest.com')).toBe(false);
    })
    test('test if email has a .', () => {
        expect(adminEmailDotValidator('test@test.com')).toBe(true);
        expect(adminEmailDotValidator('test@testcom')).toBe(false);
    })
    test('test if email has a space', () => {
        expect(adminEmailSpaceValidator('test@test.com')).toBe(true);
        expect(adminEmailSpaceValidator('test@te st.com')).toBe(false);
    })
})

