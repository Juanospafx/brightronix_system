// //************************* UPDATED FILE *************************//

// // src/js/gantt-data.js

// // 1. Define globals BEFORE importing plugins
// import $ from 'jquery';
// import moment from 'moment';

// // 2. Now import the plugins
// import 'jquery.repeater';
// import 'daterangepicker';
// import 'daterangepicker/daterangepicker.css'; // Import CSS
// import DataTable from 'datatables.net-bs5';
// import 'datatables.net-select-bs5';
// import Split from 'split.js';
// import Gantt from 'frappe-gantt';

// "use strict";

// $(function() {
//     console.log("Gantt Data Init Started..."); // Debug log

//     /* --- 1. Repeater --- */
//     if($.fn.repeater) {
//         $('.repeater').repeater({
//             defaultValues: {},
//             show: function() { $(this).slideDown(); },
//             hide: function(deleteElement) { $(this).slideUp(deleteElement); },
//             ready: function(setIndexes) {}
//         });
//     }

//     /* --- 2. DateRangePicker --- */
//     // Helper to catch errors if element doesn't exist
//     if($('input[name="single-date-pick"]').length > 0) {
//         $('input[name="single-date-pick"]').daterangepicker({
//             singleDatePicker: true,
//             startDate: moment().startOf('hour'),
//             showDropdowns: true,
//             minYear: 1901,
//             cancelClass: "btn-secondary",
//             locale: { format: 'YYYY-MM-DD' }
//         });
//     }

//     /* --- 3. Checkbox Add --- */
//     var tdCnt = 0;
//     $('.gt-todo-table tbody tr').each(function() {
//         var target = $(this).find("td > .gt-single-task >div").eq(0);
//         if(target.length) {
//             $('<span class="form-check form-check-theme"><input type="checkbox" class="form-check-input check-select" id="chk_sel_' + tdCnt + '"><label class="form-check-label" for="chk_sel_' + tdCnt + '"></label></span>').insertBefore(target);
//             tdCnt++;
//         }
//     });

//     /* --- 4. DataTables --- */
//     if ($('#datable_1t').length > 0) {
//         var groupColumn = 2;
//         var table_grp = $('#datable_1t').DataTable({
//             "dom": '<"row"<"col-12"t>>',
//             "columnDefs": [{ "visible": false, "targets": groupColumn }],
//             responsive: false,
//             autoWidth: false,
//             "bPaginate": false,
//             "info": false,
//             "bFilter": false,
//             "order": [[groupColumn, 'asc']],
//             "displayLength": 25,
//             "drawCallback": function(settings) {
//                 var api = this.api();
//                 var rows = api.rows({ page: 'current' }).nodes();
//                 var last = null;

//                 api.column(groupColumn, { page: 'current' }).data().each(function(group, i) {
//                     if (last !== group) {
//                         $(rows).eq(i).before(
//                             '<tr class="group"><td class="row-sep" colspan="5">' + group + '</td></tr>'
//                         );
//                         last = group;
//                     }
//                 });
//             }
//         });

//         // Group Click Logic
//         $('#datable_1t tbody').on('click', 'tr.group', function() {
//             var currentOrder = table_grp.order()[0];
//             if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
//                 table_grp.order([groupColumn, 'desc']).draw();
//             } else {
//                 table_grp.order([groupColumn, 'asc']).draw();
//             }
//         });
//     }

//     /* --- 5. Split JS --- */
//     // Only run if both elements exist
//     if ($('#split_1').length > 0 && $('#split_2').length > 0) {
//         Split(['#split_1', '#split_2'], {
//             gutter: function(index, direction) {
//                 var gutter = document.createElement('div')
//                 gutter.className = 'gutter gutter-' + direction
//                 gutter.style.height = '100%'
//                 return gutter
//             },
//             gutterSize: 7,
//         });
//     }

//     /* --- 6. Gantt Chart --- */
//     if (document.getElementById("gantt")) {
//         console.log("Found #gantt element, initializing...");

//         const tasks = [
//             { id: "1", name: "Draft contract", start: "2023-07-16", end: "2023-07-20", progress: 55 },
//             { id: "2", name: "Find old documents", start: "2023-07-19", end: "2023-07-21", progress: 85, dependencies: "1" },
//             { id: "3", name: "Meeting with sales", start: "2023-07-21", end: "2023-07-22", progress: 80, dependencies: "2" },
//             { id: "4", name: "iOS App home", start: "2023-07-15", end: "2023-07-17", progress: 80 }
//         ];

//         try {
//             var s = new Gantt("#gantt", tasks, {
//                 view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
//                 bar_height: 20,
//                 padding: 18,
//                 view_mode: "Week",
//                 custom_popup_html: function(task) {
//                     // SAFE HTML GENERATION
//                     const end_date = task.end;
//                     return `
//                         <div class="popover fade show bs-popover-right gantt-task-details" role="tooltip">
//                             <div class="arrow"></div>
//                             <div class="popover-body">
//                                 <h5>${task.name}</h5>
//                                 <p class="mb-2">Ends: ${end_date}</p>
//                                 <div class="progress mb-2" style="height: 10px;">
//                                     <div class="progress-bar" role="progressbar" style="width: ${task.progress}%;">${task.progress}%</div>
//                                 </div>
//                             </div>
//                         </div>
//                     `;
//                 }
//             });

//             // Scroll Logic (Safe Version)
//             // Checks if simplebar exists, otherwise uses standard scroll
//             var scrollWrapper = document.querySelector('#split_2 .simplebar-content-wrapper') || document.querySelector('#split_2');

//             if(scrollWrapper) {
//                  $("#modes-filter :input").on('change', function() {
//                     s.change_view_mode($(this).val());
//                 });
//             }

//         } catch (err) {
//             console.error("Gantt Init Failed:", err);
//         }
//     } else {
//         console.warn("Element #gantt not found.");
//     }
// });

import $ from 'jquery';
import 'jquery.repeater';
import moment from 'moment';
import 'daterangepicker';

// DataTables
import 'datatables.net-bs5';

// Split JS (Resizable panes)
import Split from 'split.js';

// Frappe Gantt
import Gantt from 'frappe-gantt';

export const initGantt = () => {
    console.log("🚀 Gantt Init Started");

    // ==========================================
    // 1. REPEATER
    // ==========================================
    if ($('.repeater').length > 0) {
        $('.repeater').repeater({
            defaultValues: {},
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            },
            ready: function (setIndexes) { }
        });
    }

    // ==========================================
    // 2. DATE PICKER
    // ==========================================
    if ($('input[name="single-date-pick"]').length) {
        $('input[name="single-date-pick"]').daterangepicker({
            singleDatePicker: true,
            startDate: moment().startOf('hour'),
            showDropdowns: true,
            minYear: 1901,
            cancelClass: "btn-secondary",
            locale: {
                format: 'YYYY-MM-DD'
            }
        });
    }

    // ==========================================
    // 3. DATATABLE (With Row Grouping)
    // ==========================================
    if ($('#datable_1t').length > 0) {

        // A. Inject Checkboxes
        let tdCnt = 0;
        $('.gt-todo-table tbody tr').each(function () {
            // Check if checkbox already exists to prevent duplication
            if ($(this).find('.check-select').length === 0) {
                const chkHTML = `<span class="form-check form-check-theme"><input type="checkbox" class="form-check-input check-select" id="chk_sel_${tdCnt}"><label class="form-check-label" for="chk_sel_${tdCnt}"></label></span>`;
                $(chkHTML).insertBefore($(this).find("td > .gt-single-task > div").eq(0));
                tdCnt++;
            }
        });

        // B. Initialize DataTable
        const groupColumn = 2;
        const tableGrp = $('#datable_1t').DataTable({
            "dom": '<"row"<"col-12"t>>', // minimal DOM
            "columnDefs": [{
                "visible": false,
                "targets": groupColumn
            }],
            responsive: false,
            autoWidth: false,
            "bPaginate": false,
            "info": false,
            "bFilter": false,
            language: {
                search: "",
                searchPlaceholder: "Search",
                sLengthMenu: "_MENU_items",
            },
            "order": [[groupColumn, 'asc']],
            "displayLength": 25,
            "drawCallback": function (settings) {
                const api = this.api();
                const rows = api.rows({ page: 'current' }).nodes();
                let last = null;

                api.column(groupColumn, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before(
                            `<tr class="group"><td class="row-sep" colspan="5">${group}</td></tr>`
                        );
                        last = group;
                    }
                });
            }
        });

        // C. Group Click Sorting
        $('#datable_1t tbody').on('click', 'tr.group', function () {
            const currentOrder = tableGrp.order()[0];
            if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
                tableGrp.order([groupColumn, 'desc']).draw();
            } else {
                tableGrp.order([groupColumn, 'asc']).draw();
            }
        });

        // D. Select All Logic
        $(".check-select-all").on("click", function (e) {
            if ($(this).is(":checked")) {
                tableGrp.rows().select();
                $('.check-select').prop('checked', true);
                $('.gt-todo-table tbody tr').addClass('selected');
            } else {
                tableGrp.rows().deselect();
                $('.check-select').prop('checked', false);
                $('.gt-todo-table tbody tr').removeClass('selected');
            }
        });

        $(".check-select").on("click", function (e) {
            if ($(this).is(":checked")) {
                $(this).closest('tr').addClass('selected');
            } else {
                $(this).closest('tr').removeClass('selected');
                $('.check-select-all').prop('checked', false);
            }
        });
    }

    // ==========================================
    // 4. SPLIT JS (Resizable Panes)
    // ==========================================
    if ($('#split_1').length && $('#split_2').length) {
        Split(['#split_1', '#split_2'], {
            gutter: function (index, direction) {
                const gutter = document.createElement('div');
                gutter.className = 'gutter gutter-' + direction;
                gutter.style.height = '100%';
                return gutter;
            },
            gutterSize: 7,
        });
    }

    // ==========================================
    // 5. FRAPPE GANTT CHART
    // ==========================================
    if (document.getElementById("gantt")) {

        const tasks = [
            { id: "1", name: "Draft the new contract document", start: "2019-07-16", end: "2019-07-20", progress: 55 },
            { id: "2", name: "Find out the old contract documents", start: "2019-07-19", end: "2019-07-21", progress: 85, dependencies: "1" },
            { id: "3", name: "Organize meeting with sales associates", start: "2019-07-21", end: "2019-07-22", progress: 80, dependencies: "2" },
            { id: "4", name: "iOS App home page", start: "2019-07-15", end: "2019-07-17", progress: 80 },
            { id: "5", name: "Write a release note", start: "2019-07-18", end: "2019-07-22", progress: 65, dependencies: "4" },
            { id: "6", name: "Setup new sales project", start: "2019-07-20", end: "2019-07-31", progress: 15 },
            { id: "7", name: "Invite user to a project", start: "2019-07-25", end: "2019-07-26", progress: 99, dependencies: "6" },
            { id: "8", name: "Coordinate with business development", start: "2019-07-28", end: "2019-07-30", progress: 35, dependencies: "7" },
            { id: "9", name: "Kanban board design", start: "2019-08-01", end: "2019-08-03", progress: 25, dependencies: "8" },
            { id: "10", name: "Enable analytics tracking", start: "2019-08-05", end: "2019-08-07", progress: 60, dependencies: "9" }
        ];

        const gantt = new Gantt("#gantt", tasks, {
            view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
            bar_height: 20,
            padding: 18,
            view_mode: "Week",
            custom_popup_html: function (task) {
                // Using template literals for cleaner HTML generation
                const end_date = task.end;
                const progressCls = task.progress >= 60 ? 'bg-success' : (task.progress >= 30 ? 'bg-warning' : 'bg-danger');

                return `
                <div class="popover fade show bs-popover-right gantt-task-details" role="tooltip">
                    <div class="arrow"></div>
                    <div class="popover-body">
                        <h5>${task.name}</h5>
                        <p class="mb-2">Expected to finish by ${end_date}</p>
                        <div class="progress mb-2" style="height: 10px;">
                            <div class="progress-bar ${progressCls}" role="progressbar" style="width: ${task.progress}%;" aria-valuenow="${task.progress}" aria-valuemin="0" aria-valuemax="100">${task.progress}%</div>
                        </div>
                    </div>
                </div>`;
            }
        });

        // Scroll Logic (Auto scroll to the first bar)
        setTimeout(() => {
            const demoScroll = document.querySelector('#split_2 .simplebar-content-wrapper') || document.querySelector('#split_2');
            if (demoScroll) {
                const firstBar = $(".bar").first();
                if (firstBar.length) {
                    let offset = firstBar.offset().left;
                    offset = offset / 4; // Adjust offset calculation as needed
                    demoScroll.scrollTo({ left: offset, behavior: "smooth" });
                }
            }
        }, 500); // Small delay to ensure render

        // View Mode Filter
        $("#modes-filter :input").on('change', function () {
            gantt.change_view_mode($(this).val());

            // Re-trigger scroll after view change
            const demoScroll = document.querySelector('#split_2 .simplebar-content-wrapper') || document.querySelector('#split_2');
            if (demoScroll) {
                const firstBar = $(".bar").first();
                if (firstBar.length) {
                    let offset = firstBar.offset().left / 4;
                    demoScroll.scrollTo({ left: offset, behavior: "smooth" });
                }
            }
        });
    }
};