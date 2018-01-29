import { createKeyDoc, openKeyDoc } from './lock';

test('lock', () => {
  const { masterKey, doc } = createKeyDoc('password');
  expect(masterKey).toBeTruthy();
  expect(doc).toBeTruthy();

  expect(() => openKeyDoc(doc, 'wrong password')).toThrow();
  const openedKey = openKeyDoc(doc, 'password');
  expect(openedKey).toEqual(masterKey);
});
