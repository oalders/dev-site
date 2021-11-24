import { Navigation } from './pagination';

const nav = new Navigation([
  {
    to: 'foo',
  },
  {
    items: [
      {
        to: 'bar-item-foo',
      },
      {
        to: 'bar-item-bar',
      },
    ],
    to: 'bar',
  },
  {
    url: '#',
  },
  {
    items: [
      {
        to: 'baz-item-foo',
      },
      {
        to: 'baz-item-bar',
      },
    ],
    secondaryItems: [
      {
        to: 'baz-secondary-foo',
      },
      {
        to: 'baz-secondary-bar',
      },
    ],
    to: 'baz',
  },
]);

describe('pagination', () => {
  describe('getPreviousPage()', () => {
    it('returns previous page', () => {
      expect(nav.getPreviousPage('bar')).toHaveProperty('to', 'foo');
    });

    it('returns previous page when current url ends with a slash', () => {
      expect(nav.getPreviousPage('bar/')).toHaveProperty('to', 'foo');
    });

    it('returns nothing if previous page does not exist', () => {
      expect(nav.getPreviousPage('foo')).toBeUndefined;
    });

    it('skips non-internal nodes', () => {
      expect(nav.getPreviousPage('baz')).toHaveProperty('to', 'bar-item-bar');
    });

    it('considers `items` child pages', () => {
      expect(nav.getPreviousPage('baz')).toHaveProperty('to', 'bar-item-bar');
    });

    it('considers `secondaryItems` child pages', () => {
      expect(nav.getPreviousPage('baz-secondary-bar'))
        .toHaveProperty('to', 'baz-secondary-foo');
    });
  });

  describe('getNextPage()', () => {
    it('returns next page', () => {
      expect(nav.getNextPage('foo')).toHaveProperty('to', 'bar');
    });

    it('returns nothing if next page does not exist', () => {
      expect(nav.getNextPage('baz-secondary-bar')).toBeUndefined();
    });

    it('skips non-internal nodes', () => {
      expect(nav.getNextPage('bar-item-bar')).toHaveProperty('to', 'baz');
    });

    it('considers `items` child pages', () => {
      expect(nav.getNextPage('bar')).toHaveProperty('to', 'bar-item-foo');
    });

    it('considers `secondaryItems` child pages', () => {
      expect(nav.getNextPage('baz-item-bar'))
        .toHaveProperty('to', 'baz-secondary-foo');
    });
  });
});
