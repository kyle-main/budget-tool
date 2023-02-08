import { MoneyFormatterSmallPipe } from './money-formatter-small.pipe';

describe('MoneyFormatterSmallPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyFormatterSmallPipe();
    expect(pipe).toBeTruthy();
  });
});
