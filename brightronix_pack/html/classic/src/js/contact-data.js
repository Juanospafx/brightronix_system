//************************* UPDATED FILE *************************//

import $ from 'jquery';
import 'select2';

// Check if you have installed this: npm install dropify
// If dropify gives errors, we might need to use the CDN version instead
import 'dropify';
import 'datatables.net-bs5';

export const initContact = () => {
	console.log("🚀 Contact Init Started");

	// ==========================================
	// 1. SELECT2 (Tag Inputs)
	// ==========================================
	if ($.fn.select2) {
		try {
			const $selects = $("#input_tags_1, #input_tags_2, #input_tags_3");
			if ($selects.length) {
				$selects.select2({
					tags: true,
					tokenSeparators: [',', ' ']
				});
				console.log("✅ Select2 Initialized");
			}
		} catch (e) {
			console.error("❌ Select2 Error:", e);
		}
	} else {
		console.warn("⚠️ Select2 library not found. Did you run 'npm install select2'?");
	}

	// ==========================================
	// 2. DROPIFY (File Upload)
	// ==========================================
	if ($.fn.dropify) {
		try {
			if ($('.dropify-1').length) {
				$('.dropify-1').dropify({
					messages: { 'default': 'Upload photo' },
					tpl: {
						message: '<div class="dropify-message"><span class="file-icon"></span> <p>{{ default }}</p></div>',
					}
				});
				console.log("✅ Dropify Initialized");
			}
		} catch (e) {
			console.error("❌ Dropify Error:", e);
		}
	} else {
		console.warn("⚠️ Dropify library not found. It usually relies on global jQuery.");
	}

	// ==========================================
	// 3. CONTACT CARDS (Checkboxes)
	// ==========================================
	if ($(".contact-card").length > 0) {
		let tdCnt = 0;
		$('.contact-card').each(function () {
			// Prevent duplicate checkboxes if function runs twice
			if ($(this).find('.check-select').length === 0) {
				const checkboxHtml = `
                    <span class="form-check form-check-lg">
                        <input type="checkbox" class="form-check-input check-select" id="chk_sel_${tdCnt}">
                        <label class="form-check-label" for="chk_sel_${tdCnt}"></label>
                    </span>`;
				$(checkboxHtml).insertBefore($(this).find(".card-action-wrap").eq(0));
				tdCnt++;
			}
		});
	}

	// ==========================================
	// 4. DATATABLE
	// ==========================================
	if ($.fn.DataTable && $("#contact_datable_1").length > 0) {
		try {
			// A. Add Checkboxes (Prevent duplicates)
			let tdCnt = 0;
			$('#contact_datable_1 tbody tr').each(function () {
				if ($(this).find('.check-select').length === 0) {
					const checkboxHtml = `
                        <span class="form-check mb-0">
                            <input type="checkbox" class="form-check-input check-select" id="chk_sel_dt_${tdCnt}">
                            <label class="form-check-label" for="chk_sel_dt_${tdCnt}"></label>
                        </span>`;
					$(checkboxHtml).insertBefore($(this).find("td .contact-star").eq(0));
					tdCnt++;
				}
			});

			// B. Init DataTable
			const targetDt = $('#contact_datable_1').DataTable({
				"dom": '<"row"<"col-7 mb-3"<"contact-toolbar-left">><"col-5 mb-3"<"contact-toolbar-right"flip>>><"row"<"col-sm-12"t>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
				"ordering": true,
				"columnDefs": [{
					"searchable": false,
					"orderable": false,
					"targets": [0, 7]
				}],
				pagingType: 'simple_numbers',
				"order": [1, 'asc'],
				language: {
					search: "",
					searchPlaceholder: "Search",
					info: "_START_ - _END_ of _TOTAL_",
					sLengthMenu: "View  _MENU_",
					paginate: {
						next: '<i class="ri-arrow-right-s-line"></i>',
						previous: '<i class="ri-arrow-left-s-line"></i>'
					}
				},
				"drawCallback": function () {
					$('#contact_datable_1_wrapper').find('.pagination').addClass('custom-pagination pagination-simple justify-content-end');
				}
			});
			console.log("✅ DataTable Initialized");

			// C. Custom Toolbar
			$('.pagination').addClass('custom-pagination pagination-simple justify-content-end');
			$("#contact_datable_1").parent().addClass('table-responsive');

			const toolbarHtml = `
                <div class="d-xxl-flex d-none align-items-center"> 
                    <select class="form-select form-select-sm w-120p"><option selected>Bulk actions</option><option value="1">Edit</option><option value="2">Move to trash</option></select> 
                    <button class="btn btn-sm btn-light ms-2">Apply</button>
                </div>
                <div class="d-xxl-flex d-none align-items-center form-group mb-0"> 
                    <label class="flex-shrink-0 mb-0 me-2">Sort by:</label> 
                    <select class="form-select form-select-sm w-130p"><option selected>Date Created</option><option value="1">Date Edited</option><option value="2">Frequent Contacts</option><option value="3">Recently Added</option></select>
                </div> 
                <select class="d-flex align-items-center w-130p form-select form-select-sm"><option selected>Export to CSV</option><option value="2">Export to PDF</option><option value="3">Send Message</option><option value="4">Delegate Access</option></select>`;
			$("div.contact-toolbar-left").html(toolbarHtml);

			// D. Event Handlers
			$(document).on('click', '.del-button', function (e) {
				e.preventDefault();
				targetDt.row($(this).closest('tr')).remove().draw(false);
			});

			$(".check-select-all").on("click", function () {
				if ($(this).is(":checked")) {
					$('#contact_datable_1 tbody tr').addClass('selected');
					$('.check-select').prop('checked', true);
				} else {
					$('#contact_datable_1 tbody tr').removeClass('selected');
					$('.check-select').prop('checked', false);
				}
			});

			$("#contact_datable_1").on("click", ".check-select", function () {
				if ($(this).is(":checked")) {
					$(this).closest('tr').addClass('selected');
				} else {
					$(this).closest('tr').removeClass('selected');
					$('.check-select-all').prop('checked', false);
				}
			});

		} catch (e) {
			console.error("❌ DataTable Error:", e);
		}
	}
};