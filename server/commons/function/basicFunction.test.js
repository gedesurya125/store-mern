const {sum} = require('./basicFunction');

test('adding two number', () => {
  expect(sum(1,2)).toBe(3);
})