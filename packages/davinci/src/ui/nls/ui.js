define("davinci/ui/nls/ui", { root:
{
		//DocileDialog.js
		"dontShowAgain":"Don't show again",
	
		//FileFieldDialog.js
		"selectFile":"Select a file",
		
		//OpenFileDialog.js
		"openFile":"Open File",//used in Resource.js as well
		
		//about.js
		"aboutMaqetta":"About Maqetta",
		"productVersion":"Version: ${0}",
		"productDate":"Date: ${0}",
		//"build":"Build: <a href='https://github.com/maqetta/maqetta/commit/${0}'> ${1}...</a> ",
		"build":"Build: ${0}",
		
		//Download.js
		"library":"Library",//used in UserLibraries.js as well
		"version":"Version",//used in UserLibraries.js as well
		"include":"Include",
		"source":"Source",
		"baseLocation":"Base Location",
		"invalidDownloadFileName": "File name may only contain letters, numbers, &#8216;_&#8216;, and &#8216;.&#8216;.",
		
		//DownloadSelected.js
		"selectedFiles":"Selected Files",
		"noFilesSelected":"No files selected!",
		"downloadButtonLabel": "Download",
		
		//NewTheme.js
		"themeAlreadyExists":"Theme already Exists!",
		"invalidThemeName": "Invalid theme name",
		"errorCreatingTheme": "Error creating theme: ",
		"creatingTheme": "Creating theme",
		
		//OpenThemeDialog.js
		"noUserThemes":"No user themes found in workspace. Please create a new theme before editing.",
		
		//ThemeSetsDialog.js and widgets/ThemeSetSelection.js
		"themeSetsDialog":"Manage theme sets",
		"renameThemeSet":"Rename theme set",
		"themeSets":"Theme sets:",
		"currentlySelectedThemeSet":"Currently selected theme set:",
		"themeSetName":"Name:",
		"desktopTheme":"Dojo desktop 1.7 theme:",
		"mobileTheme":"Dojo mobile 1.7 theme:",
		"android":"Android:",
		"blackberry":"Blackberry:",
		"ipad":"iPad:",
		"iphone":"iPhone:",
		"other":"Other:",
		"selectTheme":"Select theme",
		"themeSet":"Theme set:",
		"themeVersionMessage": "Theme version does not match workspace version this could produce unexpected results. We suggest recreating the custom theme using the current version of Maqetta and deleting the existing theme.",
		"addThemeSet": "Add theme set",
		"deleteThemeSet":"Delete theme set",

		
		//SaveAsWidgetForm.js
		//right now it has its own nls file called "common." 
		//Globalize later once it is completed
			
		//UserLibraries.js
		//"library":"Library",
		//"version":"Version",
		"workspaceLocation":"Workspace Location",
		
		//Resource.js
		"savingReadonlyFile": "This file is a read-only file. Please save it to a writeable location.",
		
		//doItLabels
		"create":"Create",
		"open":"Open",
		"save":"Save",
		"select": "Select",
		
		//fileDialog
		"fileName":"File name",//used in templates/download.html
		"folderName":"Folder name",
		"parentFolder":"Parent folder: ",//used in add files as well
		"newFolderLabel":"New folder",
		"cancelButtonLabel":"Cancel",
		"newFolderName": "Name:",
		"createFolder": "Create Folder",
		
		//dialog titles
		"createNewFile":"Create New File",
		"createMobileApplication":"Create a Mobile Application",
		"createDesktopApplication":"Create a Desktop Application",
		"createSketchHiFi":"Create a Sketch (high-fidelity)",
		"createSketchLoFi":"Create a Sketch (low-fidelity)",
		"createNewCSSFile":"Create New CSS File",
		"createNewJSFile":"Create New JavaScript File",
		//"openFile":"Open File",
		"createNewFolder":"Create New Folder",
		"saveFileAs":"Save File As",
		"downloadFile":"Download",
		
		//addFiles
		"selectFiles":"Select Files...",
		"upload":"Upload",
		"addFiles":"Upload Files",
		"uploading":"Uploading...",
		"completed":"completed: ${0} \n",
		"done":"Done",
		
		//checkFileName
		"mustEnterFileName":"You must enter a file name.",
		"cannotSelect":"Cannot select ${0}. It is a folder.",
		"fileAlreadyExistsOverwrite":"File ${0} already exists. OK to overwrite?",
		"cannotCreate":"Cannot create ${0}. It already Exists.",
		"fileNameSlashCharacter":"File names cannot contain a slash character (/). Your file name is: ${0}",
		"doesNotHaveExtension":"The name ${0} does not have an extension (e.g., .html, .css or .js) and will be treated as a plain text file. OK to proceed?",
		
		//deleteAction
		"areYouSureDelete":"Are you sure you want to delete ${0}?",
		"noResourcesSelected":"No resources are currently selected.",
		
		/*Templates*/
		//download.html -- see above for file name
		"optimizeOption": "Use Dojo Web Builder (experimental)",
		"downloadFullSource": "Download uncompressed source for selected libraries (if available)",
		"selectAll": "All",
		"selectNone": "None",
		
		//newtheme.html
		"themeToClone":"Theme to clone",
		"newName":"New Name",
				
		//OpenThemeDialog.html
		"selectTheme":"Select a Theme",

		//ProjectToolbar.js
		"newProject":"New Project",
		"renameProjectDialogTitle": "Rename Project To...",
		"deleteProjectButtonTitle": "Delete Project",
		"renameProjectButtonTitle": "Rename Project...",
		"deleteOnlyProjectError": "You can't delete the only project in your workspace!",
		
		//NewFile.html
		"newFileShowFiles":"Show file picker",
		"newFileHideFiles":"Hide file picker",
		"root":"(root)",
		
		//NewHTMLFileOptions.html - Composition type strings
		"nhfoDevice":"Device:",
		'nhfoDeviceTooltip':'Select an initial mobile device',
		
		//NewHTMLFileOptions.html - Theme strings
		"nhfoThemeButtonLabel":"Theme...",
		"nhfoThemeButtonTitle":"Select themes or theme set for new HTML file",

		//Rename
		"renameNewLabel": "Name:",
		"renameButtonLabel": "Rename",
		"renameDialogTitle": "Rename To...",

		//NewProject
		"newProjectName": "Name:",
		"newProjectEclipseSupport": "Eclipse support",
		"newProjectNameExists": "A project with this name already exists",

		//UserLibraries
		"modify": "Modify",
		
		//UserName.js
		"User": "User",

		//SelectProjectDialog.js
		"currentProject": "Current Project:",
		"selectProject": "Select a Project:"
}
});
