//************************* UPDATED FILE *************************//

(function () {
    // We wrap everything in a function to avoid variable conflicts
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const sunSpan = document.getElementById('icon-sun');
    const moonSpan = document.getElementById('icon-moon');

    // Optional: Select Logos (If you are using them)
    const logoLight = document.getElementById('logo-light');
    const logoDark = document.getElementById('logo-dark');

    const invLogoLight = document.getElementById('invLogoLight');
    const invLogoDark = document.getElementById('invLogoDark');

    const authLogoLight = document.getElementById('authLogoLight');
    const authLogoDark = document.getElementById('authLogoDark');

    // 1. Select ALL elements with these classes (returns a NodeList)
    const lightImg = document.querySelectorAll('.img-light');
    const darkImg = document.querySelectorAll('.img-dark');

    // Helper: Update UI
    const updateUI = (theme) => {
        if (theme === 'dark') {
            // Dark Mode
            if (sunSpan) sunSpan.classList.remove('d-none');
            if (moonSpan) moonSpan.classList.add('d-none');

            // Toggle Logos (if they exist)
            if (logoLight) logoLight.classList.add('d-none');
            if (logoDark) logoDark.classList.remove('d-none');

            // Toggle Invoice Logos (if they exist)
            if (invLogoLight) invLogoLight.classList.add('d-none');
            if (invLogoDark) invLogoDark.classList.remove('d-none');

            // Toggle Auth Logo (if they exist)
            if (authLogoLight) authLogoLight.classList.add('d-none');
            if (authLogoDark) authLogoDark.classList.add('d-inline-block');

            // Toggle ALL Dark Images -> Show them
            lightImg.forEach(el => el.classList.add('d-none'));
            darkImg.forEach(el => {
                el.classList.remove('d-none');
            });

        } else {
            // Light Mode
            if (sunSpan) sunSpan.classList.add('d-none');
            if (moonSpan) moonSpan.classList.remove('d-none');

            // Toggle Logos (if they exist)
            if (logoLight) logoLight.classList.remove('d-none');
            if (logoDark) logoDark.classList.add('d-none');

            // Toggle Invoice Logos (if they exist)
            if (invLogoLight) invLogoLight.classList.remove('d-none');
            if (invLogoDark) invLogoDark.classList.add('d-none');

            // Toggle Auth Logo (if they exist)
            if (authLogoLight) authLogoLight.classList.add('d-inline-block');
            if (authLogoDark) authLogoDark.classList.add('d-none');

            // Toggle ALL Light Logos -> Show them
            lightImg.forEach(el => {
                el.classList.remove('d-none');
            });
            darkImg.forEach(el => el.classList.add('d-none'));
        }
    };

    // 1. Initialize Theme on Load
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', currentTheme);
    updateUI(currentTheme);

    // 2. Render Icons (Check if feather exists first)
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // 3. Handle click event
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const activeTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

            // Apply Theme & Save
            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update UI
            updateUI(newTheme);

            // 🔥 RE-INIT TinyMCE
            if (window.tinymce && window.initTinyMCE) {
                tinymce.remove();
                window.initTinyMCE();
            }
        });
    }
})();