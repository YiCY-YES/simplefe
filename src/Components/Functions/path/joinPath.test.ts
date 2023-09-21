import * as joinPath from './joinPath';

// @ponicode
describe('joinPath.default', () => {
	test('0', () => {
		const result = joinPath.default('path/to/', 'test');
		expect(result).toBe('path/to/test');
	});

	test('1', () => {
		const result = joinPath.default('path/to/folder/', 'a');
		expect(result).toBe('path/to/folder/a');
	});

	test('2', () => {
		const result = joinPath.default('/path/to/file', 'hello');
		expect(result).toBe('/path/to/file/hello');
	});

	test('3', () => {
		const result = joinPath.default('C:\\\\path\\to\\folder\\', 'myfile');
		expect(result).toBe('C:\\\\path\\to\\folder\\myfile');
	});
	test('4', () => {
		const result = joinPath.default('/path/to/file', 'hello', 'world');
		expect(result).toBe('/path/to/file/hello/world');
	});
	test('5', () => {
		const result = joinPath.default('C:\\\\path\\to\\folder\\', 'myfile', 'hello');
		expect(result).toBe('C:\\\\path\\to\\folder\\myfile\\hello');
	});
});
