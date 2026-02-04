// 1. Import your main SCSS (This handles all your Bootstrap + Custom CSS)
import './scss/style.scss';

// 2. Import Libraries
import './js/theme.js'; // Theme specific JS (if any)
// import $ from 'jquery';
import * as bootstrap from 'bootstrap';
import feather from 'feather-icons';
import simplebar from 'simplebar';
import ApexCharts from 'apexcharts';

// DataTables (Must import the BS5 version)
import 'datatables.net-bs5';
import 'datatables.net-select-bs5';
import 'datatables.net-responsive-bs5';
//other libraries
import 'daterangepicker/daterangepicker.js';


// 3. EXPOSE GLOBALS (The Shim Layer)
window.bootstrap = bootstrap;
window.feather = feather;

import './js/init.js'
import './js/chips-init.js'
import './js/dashboard-data.js'
import './js/dropdown-bootstrap-extended.js'
import './js/daterangepicker-data.js'
import './js/color-picker-data.js'
import './js/rating.js'
import './js/fm-data.js'
import './js/tinymce-data.js'
import './js/froogaloop2.min.js'

import './js/blog-data.js'
import './js/invoice-data.js'
import './js/integration-data.js'
import './js/owl-data.js'
import './js/select2-data.js'
import './js/gantt-data.js'
import { initCalendar } from './js/fullcalendar-init.js';
import { initDropify } from './js/dropify-data.js';
import { initKanban } from './js/kanban-board-data.js';
import { initPipeline } from './js/pipeline-data.js';
import { initContact } from './js/contact-data.js';
import { initTodo } from './js/todo-data.js';
import { initGantt } from './js/gantt-data.js';
import { initCreateInvoice } from './js/create-invoice-data.js';
import { initGallery } from './js/gallery-data.js';

// 5. Force Icon & Table Initialization
$(document).ready(() => {
  console.log('Main.js Ready');

  // Manually trigger feather icons
  feather.replace();

  // Debugging: Check if DataTable is loaded
  if ($.fn.DataTable) {
    console.log('DataTables is loaded successfully!');
  } else {
    console.error('DataTables failed to load.');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initCalendar();
  initDropify();
  initKanban();

  // // Only run if the pipeline container exists
  if (document.querySelector('.spipeline-list') || document.getElementById('tasklist_wrap')) {
    initPipeline();
  }

  initContact();
  initTodo();
  initGantt();
  initGallery();


  if (window.initTinyMCE) window.initTinyMCE();

  if (document.querySelector('.invoice-table')) {
    initCreateInvoice();
  }

});



console.log("Jampack Dashboard Loaded via Vite");