import { createRecord, updateRecord, dehydrate, hydrate, Bank } from './';

test('dehydrate', () => {
  const obj = { foo: 'bar', baz: 123, array: [1, 2, 3] };
  const archive = dehydrate(obj);
  const newobj = hydrate(archive);
  expect(newobj).toEqual(obj);
});

test('updateRecord', () => {
  const bank1: Bank = createRecord(() => 'abc123', {name: '1st bank'});
  expect(bank1).toHaveProperty('id');
  expect(bank1).toHaveProperty('_base');
  expect(bank1).toHaveProperty('_history');

  // simple update
  const bank2 = updateRecord(bank1, {t: 20, q: {name: {$set: '2nd bank'}}});
  expect(bank2).toHaveProperty('name', '2nd bank');

  // conflicting change
  const bank3 = updateRecord(bank2, {t: 10, q: {name: {$set: '3rd bank'}}});
  expect(bank3).toHaveProperty('name', '2nd bank');
});
