import sum from '../helpers/sum'

describe('Sum function test', () => {
    it('should sum number correct' , () => {
        expect(sum(1,2)).toBe(3);
    })
})