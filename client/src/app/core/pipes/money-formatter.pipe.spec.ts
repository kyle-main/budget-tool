import { MoneyFormatterPipe } from './money-formatter.pipe';

describe('MoneyFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
