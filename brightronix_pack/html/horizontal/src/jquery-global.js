// src/js/jquery-global.js
import jquery from 'jquery';

// Expose jQuery globally
if (typeof window !== 'undefined') {
    window.jQuery = window.$ = jquery;
    console.log("✅ jQuery exposed globally");
}