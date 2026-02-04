// //************************* UPDATED FILE *************************//

// // src/js/gallery-data.js
// import $ from 'jquery';

// // 1. Import LightGallery JS (v1.6.11)
// // In v1, importing the package usually attaches itself to jQuery automatically
// import 'lightgallery'; 
// import 'lightgallery/modules/lg-share.min.js';      // The Share Icon
// import 'lightgallery/modules/lg-zoom.min.js';       // The Zoom In/Out Icons
// import 'lightgallery/modules/lg-fullscreen.min.js'; // The Fullscreen Icon
// import 'lightgallery/modules/lg-autoplay.min.js';   // The Play Button

// "use strict";

// $(function() {
//     /* 1. Checkbox Logic (Unchanged) */
// 	var tdCnt = 0;
// 	$('.gallery-body .collapse-simple .col > a').each(function(){
// 		$('<div class="form-check form-check-lg"><input type="checkbox" class="form-check-input check-select" id="chk_sel_'+tdCnt+'"><label class="form-check-label" for="chk_sel_'+tdCnt+'"></label></div>').appendTo($(this));
// 		tdCnt++;
// 	});

//     /* 2. LightGallery Init (v1 Syntax) */
//     if ($('.hk-gallery').length > 0) {
//         $('.hk-gallery').lightGallery({
//             addClass: 'galleryapp-info-active',
//             mode: 'lg-fade',
//             selector: '.gallery-img',
//             thumbnail: false,
//             hash: false,
// 			share: true,
//             zoom: true,
//             fullScreen: true,
//             autoplay: true,
//             autoplayControls: true,
//             download: true
//         });
//     }
// });


import $ from 'jquery';

// Import LightGallery v1 Core
import 'lightgallery';


export const initGallery = () => {
    console.log("🚀 Gallery Init Started");

    // ==========================================
    // 1. DYNAMIC CHECKBOXES
    // ==========================================
    // Adds selection checkboxes to gallery items dynamically
    if ($('.gallery-body .collapse-simple .col > a').length > 0) {
        let tdCnt = 0;
        $('.gallery-body .collapse-simple .col > a').each(function () {
            // Check if checkbox already exists to avoid duplicates on re-init
            if ($(this).find('.check-select').length === 0) {
                const checkboxHtml = `
                    <div class="form-check form-check-lg">
                        <input type="checkbox" class="form-check-input check-select" id="chk_sel_${tdCnt}">
                        <label class="form-check-label" for="chk_sel_${tdCnt}"></label>
                    </div>`;

                $(checkboxHtml).appendTo($(this));
                tdCnt++;
            }
        });
    }

    // ==========================================
    // 2. LIGHTGALLERY INIT (v1.6.11)
    // ==========================================
    if ($('.hk-gallery').length > 0) {
        // Destroy existing instance if it exists to prevent double-binding
        if ($('.hk-gallery').data('lightGallery')) {
            $('.hk-gallery').data('lightGallery').destroy(true);
        }

        $('.hk-gallery').lightGallery({
            addClass: 'galleryapp-info-active',
            mode: 'lg-fade',
            selector: '.gallery-img',
            thumbnail: false,
            hash: false,
            // v1 often requires explicit loop setting or it assumes true
            loop: true,
            share: true,
            zoom: true,
            fullScreen: true,
            download: true,
            autoplay: false,
            autoplayControls: true,
        });

        console.log("✅ LightGallery v1 Initialized");
    }
};