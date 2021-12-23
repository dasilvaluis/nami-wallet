import { reduceUrlToHost } from "../../../api/helpers";

describe('reduceUrlToHost', () => {
  test('removes the protocol out of a given url', () => {
    expect(reduceUrlToHost('https://example.com')).toEqual('example.com');
    expect(reduceUrlToHost('http://example.com')).toEqual('example.com');
  });

  test('removes the path out of a given url', () => {
    expect(reduceUrlToHost('example.com/page/subpage')).toEqual('example.com');
  });

  test('removes the path and protocol out of a given url', () => {
    expect(reduceUrlToHost('http://example.com/page')).toEqual('example.com');
    expect(reduceUrlToHost('https://example.com/page/subpage')).toEqual('example.com');
  });

  test('preserves the port of the url', () => {
    expect(reduceUrlToHost('http://example.com:5000/page')).toEqual('example.com:5000');
  });

  test('returns the same url if no path or protocol exist', () => {
    expect(reduceUrlToHost('example.com:5000')).toEqual('example.com:5000');
  });
});