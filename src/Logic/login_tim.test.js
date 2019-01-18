
const { emailExist, emailAt, emailPeriod, emailSpace, loginPassword } = require('../Logic/logic_tim')


describe('email validator functions', () => {
    test('test if email exists', () => {
        expect(emailExist('tim@gmail.com')).toBe(true);
    })
    test('if email has an @ symbol', () => {
        expect(emailAt('time@gmail.com')).toBe(true);
        expect(emailAt('timegmail.com')).toBe(false);
      
    })
    test('if email has an . ', () => {
        expect(emailPeriod('time@gmail.com')).toBe(true);
        expect(emailPeriod('tim@egmailcom')).toBe(false);
    })

    test('if email has a space ', () => {
        expect(emailSpace('time@gmail.com')).toBe(true);
        expect(emailSpace('tim@egma il.com')).toBe(false);
    })
})

describe('password function', () => {
    test('test if password exists', () => {
        expect(loginPassword('dkdjfjj2234')).toBe(true);
    })
   
    })