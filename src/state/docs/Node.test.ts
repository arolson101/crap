import { createNode, updateNode, Bank } from './';

describe('db', () => {
  test('updateNode', () => {
    const bank1: Bank = createNode({name: '1st bank'});
    expect(bank1).toHaveProperty('id');
    expect(bank1).toHaveProperty('_base');
    expect(bank1).toHaveProperty('_history');

    // simple update
    const bank2 = updateNode(bank1, {t: 20, q: {name: {$set: '2nd bank'}}});
    expect(bank2).toHaveProperty('name', '2nd bank');

    // conflicting change
    const bank3 = updateNode(bank2, {t: 10, q: {name: {$set: '3rd bank'}}});
    expect(bank3).toHaveProperty('name', '2nd bank');
  });
});
