import { describe, expect, it } from 'vitest';
import { createTranslator } from 'next-intl';
import pt from '../../messages/pt-BR.json';
import en from '../../messages/en.json';

function flatten(messages: object, prefix = ''): Record<string, string> {
  return Object.fromEntries(
    Object.entries(messages).flatMap(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof value === 'string'
        ? [[path, value]]
        : Object.entries(flatten(value, path));
    }),
  );
}

describe('catálogos institucionais', () => {
  it('oferece as mesmas mensagens nos dois idiomas sem valores vazios', () => {
    const portuguese = flatten(pt);
    const english = flatten(en);
    expect(Object.keys(english).sort()).toEqual(Object.keys(portuguese).sort());
    for (const value of [
      ...Object.values(portuguese),
      ...Object.values(english),
    ]) {
      expect(value.trim().length).toBeGreaterThan(0);
    }
  });

  it.each([
    ['pt-BR', pt],
    ['en', en],
  ] as const)(
    'compila todas as mensagens de %s sem erros ICU',
    (locale, messages) => {
      const errors: Error[] = [];
      const flat = flatten(messages);
      const t = createTranslator({
        locale,
        messages,
        onError: (error) => errors.push(error),
      });
      for (const key of Object.keys(flat)) {
        t.rich(key as Parameters<typeof t>[0], {
          strong: (text) => text,
        });
      }
      expect(errors).toEqual([]);
    },
  );
});
