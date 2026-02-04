// src/js/select2-data.js

// 1. Core Imports
import $ from 'jquery';

"use strict";

$(function() {
    // 3. Dynamic Import of Select2 (Ensures jQuery is ready first)
    import('select2').then(() => {
        
        /* Basic Init */
        if ($(".select2").length > 0) {
            $(".select2").select2({
                // theme: 'bootstrap-5', // Uncomment if you use the BS5 theme
                width: '100%' // Fixes common sizing issues
            });
        }

        /* Tags Input Init */
        if ($("#input_tags").length > 0) {
            $("#input_tags").select2({
                tags: true,
                tokenSeparators: [',', ' '],
                // theme: 'bootstrap-5',
                width: '100%'
            });
        }

    }).catch(err => console.error("Select2 failed to load:", err));
});