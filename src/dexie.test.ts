import { test } from  './dexie';

describe('dexie tests', () => {
  it('test dexie', async () => {
    return test();
  });

  it('succeeds', () => {
    const x = 1 + 1;
    expect(x).toBe(2);
  });

  xit('fails', () => {
    const x = 1 + 1;
    expect(x).toBe(0);
  });
});
