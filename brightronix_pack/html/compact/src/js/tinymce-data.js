//************************* UPDATED FILE *************************//


// Import Core TinyMCE
import tinymce from 'tinymce/tinymce';

// Import Theme, Icons, and Models (Required for the bundle to work)
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default/icons';
import 'tinymce/models/dom/model';

// Define the initialization function
const initTinyMCE = () => {
	console.log("🚀 TinyMCE Init/Re-init Triggered");

	// 1. Detect Current Theme from HTML attribute
	// This reads the value set by your theme.js ('light' or 'dark')
	const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';

	console.log(`🎨 Configuring TinyMCE for: ${isDark ? 'DARK' : 'LIGHT'} mode`);

	// 2. Define Configuration
	const commonConfig = {
		base_url: '/tinymce', // Must match where you copied files in vite.config.js
		suffix: '.min',
		height: 400,
		menubar: 'file edit view insert format tools table help',

		// Dynamic Skin/Content CSS based on isDark
		skin: isDark ? 'oxide-dark' : 'oxide',
		content_css: isDark ? 'dark' : 'default',

		// Plugins as a string (relies on the copied /tinymce folder)
		plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help quickbars emoticons',

		toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',

		toolbar_sticky: true,
		autosave_ask_before_unload: true,
		image_advtab: true,
		importcss_append: true,

		templates: [
			{ title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
			{ title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' }
		],
	};

	// 3. Remove existing instances (Safety check before re-init)
	if (tinymce.get('classic')) tinymce.get('classic').remove();
	tinymce.remove('.dfree-body');

	// 4. Init Classic Editor
	if (document.querySelector('textarea#classic')) {
		tinymce.init({
			...commonConfig,
			selector: 'textarea#classic'
		});
	}

	// 5. Init Inline Editor
	if (document.querySelector('.dfree-body')) {
		tinymce.init({
			...commonConfig,
			selector: '.dfree-body',
			inline: true,
			menubar: false,
			toolbar: false,
			plugins: 'autolink codesample link lists media table image quickbars help',
			quickbars_selection_toolbar: 'bold italic underline | blocks | blockquote quicklink',
		});
	}
};

// --- EXPOSE GLOBALLY FOR THEME.JS ---
window.tinymce = tinymce;
window.initTinyMCE = initTinyMCE;

// Export for main.js if needed
export { initTinyMCE };

