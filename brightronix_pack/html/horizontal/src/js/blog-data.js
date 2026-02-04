//************************* UPDATED FILE *************************//
// src/js/blog-data.js

// 1. Core Imports
import $ from 'jquery';

// 2. Library Imports
import DataTable from 'datatables.net-bs5';
import 'datatables.net-select-bs5';


"use strict"; 

$(function() {
    
    /* --- Select2 Init --- */
    // Only init if elements exist
    if($("#input_tags").length > 0 || $("#input_tags_1").length > 0) {
        // We import select2 here to ensure window.$ is already set
        import('select2').then(() => {
            $("#input_tags,#input_tags_1").select2({
                tags: true,
                tokenSeparators: [',', ' ']
            });
        }).catch(err => console.error("Failed to load select2", err));
    }
	
	/* --- DataTable Init --- */
	if ($("#blog_datable_1").length > 0) {
		
        /* Checkbox Add Logic */
		let tdCnt = 0; // Changed to 'let' to allow incrementing
		$('table tr').each(function(){
            // Only append if it doesn't already exist to prevent duplicates on re-renders
            if($(this).find('.check-select').length === 0) {
			    $('<span class="form-check mb-0"><input type="checkbox" class="form-check-input check-select" id="chk_sel_'+tdCnt+'"><label class="form-check-label" for="chk_sel_'+tdCnt+'"></label></span>').appendTo($(this).find("td:first-child"));
			    tdCnt++;
            }
		});

        // Initialize DataTable
		var targetDt = $('#blog_datable_1').DataTable({
			"dom": '<"row"<"col-7 mb-3"<"blog-toolbar-left">><"col-5 mb-3"<"blog-toolbar-right"flip>>><"row"<"col-sm-12"t>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
			"ordering": true,
			"columnDefs": [ {
				"searchable": false,
				"orderable": false,
				"targets": [0,1,3,4,5,6,7,8,9]
			} ],
			pagingType: 'simple_numbers',
			"order": [2, 'asc' ],
			language: { 
                search: "",
				searchPlaceholder: "Search",
				"info": "_START_ - _END_ of _TOTAL_",
				sLengthMenu: "View  _MENU_",
				paginate: {
				  next: '<i class="ri-arrow-right-s-line"></i>', // Requires Remix Icons
				  previous: '<i class="ri-arrow-left-s-line"></i>' 
				}
			},
			"drawCallback": function () {
				$('#datable_1_wrapper').find('.pagination').addClass('custom-pagination pagination-simple justify-content-end');
			}
		});

		$('.pagination').addClass('custom-pagination pagination-simple justify-content-end');

        // Delete Button Logic
		$(document).on( 'click', '.del-button', function () {
			targetDt.row('.selected').remove().draw( false );
			return false;
		});

        // Inject Custom Toolbar HTML
        // Note: This injects buttons and dropdowns into the DOM defined in "dom" option above
		$("div.blog-toolbar-left").html('<div class="d-xxl-flex d-none align-items-center"> <select class="form-select form-select-sm w-120p"><option selected>Bulk actions</option><option value="1">Edit</option><option value="2">Move to trash</option></select> <button class="btn btn-sm btn-light ms-2">Apply</button></div><div class="d-xxl-flex d-none align-items-center form-group mb-0"> <label class="flex-shrink-0 mb-0 me-2">Sort by:</label> <select class="form-select form-select-sm w-130p"><option selected>Date Created</option><option value="1">Date Edited</option><option value="2">Frequent Contacts</option><option value="3">Recently Added</option> </select></div> <select class="d-flex align-items-center w-130p form-select form-select-sm"><option selected>Export to CSV</option><option value="2">Export to PDF</option><option value="3">Send Message</option><option value="4">Delegate Access</option> </select>');
		
        $("#blog_datable_1").parent().addClass('table-responsive');
		
        /* Select All Logic */
		var DT1 = $('#blog_datable_1').DataTable();
		
        $(".check-select-all").on( "click", function(e) {
			$('.check-select').attr('checked', true);
			if ($(this).is( ":checked" )) {
				DT1.rows().select();    
				$('.check-select').prop('checked', true);			
			} else {
				DT1.rows().deselect(); 
				$('.check-select').prop('checked', false);
			}
		});

		$(".check-select").on( "click", function(e) {
			if ($(this).is( ":checked" )) {
				$(this).closest('tr').addClass('selected');        
			} else {
				$(this).closest('tr').removeClass('selected');
				$('.check-select-all').prop('checked', false);
			}
		});
	}
});