import { updateTheme } from './Components/Theme/theme';
import { windowManager } from './Components/Layout/windowManager';
import createSidebar from './Components/Layout/sidebar';
import Home from './Components/Layout/home';
import { detectDriveInit } from './Components/Drives/drives';
import { OpenDir, OpenInit } from './Components/Open/open';
import { createNewTab, Tab } from './Components/Layout/tab';
import { Shortcut } from './Components/Shortcut/shortcut';
import { SelectInit } from './Components/Files/File Operation/select';
import CLIInformations from './Service/cli';
import Storage from './Service/storage';
import Setting from './Components/Setting/setting';
import ContextMenu from './Components/ContextMenu/contextMenu';
// import Hover from './Components/Layout/hover';
import LAZY_LOAD_INIT from './Components/Functions/lazyLoadingImage';
import Infobar from './Components/Layout/infobar';
import Search from './Components/Files/File Operation/search';
import { listenUpdateTheme } from './Service/window';
import { Resizer } from './Components/Layout/resizer';
import { MAIN_BOX_ELEMENT } from './Util/constants';
import FileAPI from './Service/files';

import { invoke } from '@tauri-apps/api';
import { eURLify, URLify } from './Components/Functions/urlify';

// Wait DOM Loaded to be loaded
interface PreviewStc {
	s: string;
	p: string;
}
function updateContent(content: string) {
	document.documentElement.innerHTML =
		content +
		`    <style>
.preview-object {
width: 100%;
height:100%;
}
table {
width: auto;
min-width: 100%;
}
td,th {
border: 2px solid #0f3002;
}
tr,th,td:hover{
    background-color: #9f9092;
    }
tr:nth-child(even) {
background: #60c716bf;
color: #3402b5;
}
tr:nth-child(odd) {
background: #8e5938;
color: white;
}
object{
height:100%;
}
body{
height:100%;
}
.document-container{
height:100%;
position: fixed;
}
.loading-bar{
    line-height: 200px;
    text-align:center;
}
.spinner {
    width: 60px;
    height: 60px;
    background-color: #67CF22;
    margin: 100px auto;
    animation: rotateplane 1.2s infinite ease-in-out;
  }
  @keyframes rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    } 50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    } 100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
</style>`;
	return;
}
document.addEventListener('DOMContentLoaded', async () => {
	invoke('ask_preview').then(
		async (message: PreviewStc) => {
			if (message.p === '') {
				updateContent(message.s);
			} else if (message.s === '') {
				updateContent(`<h1 class="loading-bar">loading</h1><div class="spinner"></div>`);
				const { convertToHtml } = require('./Components/Files/File Preview/mammoth.browser.min.js');
				const buf = await new FileAPI(message.p).readBuffer();
				convertToHtml({ arrayBuffer: buf }).then((result: { value: string }) => {
					updateContent(`<div class='preview-object' data-type="docx">${eURLify(result.value)}</div>`);
				});
			} else {
				//其他类型文件
				updateContent(message.s);
			}
			return;
		},
		(err) => console.log(err)
	);

	// Read user preferences
	const _preference = await Storage.get('preference');
	// Initialize folder to open
	const cli = await CLIInformations();
	if (!cli.dirs.length) {
		if ((_preference?.on_startup ?? 'new') === 'new') {
			Home();
		}
		// Initialize Tabs
		await Tab();
	} else {
		OpenDir(cli.dirs[0], cli.is_reveal);
		for (let i = 1; i < cli.dirs.length; i++) {
			createNewTab(cli.dirs[i]);
		}
		// Initialize Tabs
		Tab(cli.is_reveal);
	}
	// Listen to minimize, maximize, exit and reload button
	windowManager();
	// Initialize drive detection
	detectDriveInit();
	// Build sidebar
	createSidebar();
	// Update the page styling
	if (cli.custom_style_sheet) {
		updateTheme('root', cli.custom_style_sheet);
	} else {
		updateTheme('root');
	}
	// Initialize open dir/files listener
	OpenInit();
	// Intialize shortcuts
	Shortcut();
	// Initialize select files listener
	SelectInit();
	// Initialize user preference
	MAIN_BOX_ELEMENT().dataset.hideHiddenFiles = String(_preference?.hideHiddenFiles ?? true);
	// Initialize settings
	Setting();
	// Initialize info bar
	Infobar();
	// Initialize context menu
	ContextMenu();
	// Initialize hover handler
	// Hover();
	// Initialize search feature
	Search();
	// Initialize lazy loading image handler (for performance)
	LAZY_LOAD_INIT();
	// Initialize sidebar resizer
	Resizer();
	// Listen to update theme event
	listenUpdateTheme(async () => {
		await Storage.get('theme', true);
		await Storage.get('extensions', true);
		updateTheme('*');
	});
});
