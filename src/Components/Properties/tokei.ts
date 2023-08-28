import { invoke } from '@tauri-apps/api';
interface ChildrenL {
	language_type: string;
	rpt: [Report];
}
interface Report {
	language_type: string;
	blanks: number;
	code: number;
	comments: number;
	files: number;
}
interface LanguageInfo {
	blanks: number;
	code: number;
	comments: number;
	children?: [ChildrenL];
}

/**
 * Show properties of a file
 * @param {string} filePath - Path of the file to show the properties
 * @returns {Promise<Language>} Result
 */
const tokei = async (filePath: string): Promise<LanguageInfo> => {
    const result:LanguageInfo = {blanks:0,code:0,comments:0};
    console.log(filePath);

    invoke('get_tokei', { path:filePath}).then((result) =>{
        console.log(result);
    })

    return result;

}

export default tokei;
