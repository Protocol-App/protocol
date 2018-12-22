const { formatPhoneNumber, generatePin } = require('./StaffLogin').default;

//stephanie's unit tests

describe('formatPhoneNumber function', () => {
    test('formatPhoneNumber should be defined', () => {
        expect(formatPhoneNumber).toBeDefined();
    })
    test('formatPhoneNumber should take in an 11 digit US phone number (with or without parenthesis, spaces, and dashes) and return that 11 digit number without parenthesis or dashes, and prefaced with +', () => {
        expect(formatPhoneNumber('1 (555) 249-9052')).toBe('+15552499052');
        expect(formatPhoneNumber('1-490-200-1112')).toBe('+14902001112');
        expect(formatPhoneNumber('1 308943  9235')).toBe('+13089439235');
        expect(formatPhoneNumber('12223334444')).toBe('+12223334444');
    })
    test('formatPhoneNumber should return null for non-11-digit phone number inputs', () => {
        expect(formatPhoneNumber('')).toBeNull();
        expect(formatPhoneNumber('1 (630)')).toBeNull();
        expect(formatPhoneNumber('1-555-908-45555590')).toBeNull();
    })
})

describe('generatePin function', () => {
    test('generatePin should be defined', () => {
        expect(generatePin).toBeDefined();
    })
    test('generatePin should return a string', () => {
        expect(typeof generatePin()).toBe('string')
    })
    test('generatePin should return a string 4 characters long', () => {
        expect(generatePin().length).toBe(4)
    })
    test('generatePin should return a string of only numbers', () => {
        expect(typeof parseInt(generatePin())).toBe('number')
    })
    
})
