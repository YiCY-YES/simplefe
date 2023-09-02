import { invoke } from '@tauri-apps/api';
// import { type } from '@tauri-apps/api/os';
interface Detail {
	language_type: string;
	blanks: number;
	code: number;
	comments: number;
	files: number;
	lines: number;
	children: [InnerReport];
}
interface InnerReport {
	language_type: string;
	blanks: number;
	code: number;
	comments: number;
	files: number;
	lines: number;
}
interface LanguageInfo {
	blanks: number;
	code: number;
	comments: number;
	files: number;
	lines: number;
	types?: [Detail];
}
type Row = Array<string>;

const render = (data: LanguageInfo) => {
	const PROPERTIES_ELEMENT = document.querySelector<HTMLElement>('#tokei');
	const a = ['Language', 'Files', 'Lines', 'Code', 'Comments', 'Blanks'];
	const b = ['总计', data.files.toString(), data.lines.toString(), data.code.toString(), data.comments.toString(), data.blanks.toString()];
	const c = [];
	function f(arg: number | string): string {
		return `<div>${arg.toString()}</div>`;
	}
	for (const lang of data.types) {
		c.push(lang.language_type);
		c.push(lang.files.toString());
		c.push(lang.lines.toString());
		c.push(lang.code.toString());
		c.push(lang.comments.toString());
		c.push(lang.blanks.toString());
		for (const cd of lang.children) {
			c.push(f('嵌套语言' + cd.language_type));
			c.push(f(cd.files));
			c.push(f(cd.lines));
			c.push(f(cd.code));
			c.push(f(cd.comments));
			c.push(f(cd.blanks));
		}
	}
	PROPERTIES_ELEMENT.innerHTML = renderRow(a) + renderRow(b) + renderRow(c);
};
function renderRow(args: Row): string {
	const result = document.createElement('div');
	for (const s of args) {
		const ele = document.createElement('div');
		ele.innerHTML = s;
		result.appendChild(ele);
	}
	return result.innerHTML;
}
/**
 * Show properties of a file
 * @param {string} filePath - Path of the file to show the properties
 * @returns {Promise<Language>} Result
 */
const tokei = async (filePath: string): Promise<LanguageInfo> => {
	const PROPERTIES_ELEMENT = document.querySelector<HTMLElement>('#codeinfo');
	PROPERTIES_ELEMENT.style.display = 'block';
	PROPERTIES_ELEMENT.querySelector<HTMLElement>('#tokei').style.display = 'none';
	const path = document.createElement('span');
	path.innerHTML = filePath;
	PROPERTIES_ELEMENT.querySelector('.properties-heading-title').innerHTML = 'tokei';
	PROPERTIES_ELEMENT.querySelector('.properties-heading-title').appendChild(path);
	PROPERTIES_ELEMENT.querySelector<HTMLElement>('.loading').style.display = 'block';
	PROPERTIES_ELEMENT.querySelector('.properties-heading-exit').addEventListener('click', () => {
		PROPERTIES_ELEMENT.style.display = 'none';
	});
	const result: LanguageInfo = { blanks: 0, code: 0, files: 0, lines: 0, comments: 0 };
	invoke('get_tokei', { path: filePath }).then((result: LanguageInfo) => {
		document.querySelector<HTMLElement>('#tokei').style.display = 'grid';
		PROPERTIES_ELEMENT.querySelector<HTMLElement>('.loading').style.display = 'none';
		render(result);
	});
	return result;
};

export default tokei;
