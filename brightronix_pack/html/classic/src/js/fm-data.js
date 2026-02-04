// src/js/fm-data.js
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-select-bs5';

"use strict";

$(function () {
	// Only run if the table exists
	if ($("#fm_datable_1").length > 0) {

		/* Checkbox Add: Inserts a checkbox before the file-star icon */
		var tdCnt = 0;
		$('table tr').each(function () {
			// Only insert if we find the target
			var target = $(this).find("td > .d-flex .file-star").eq(0);
			if (target.length > 0) {
				$('<span class="form-check mb-0"><input type="checkbox" class="form-check-input check-select" id="chk_sel_' + tdCnt + '"><label class="form-check-label" for="chk_sel_' + tdCnt + '"></label></span>').insertBefore(target);
				tdCnt++;
			}
		});

		/* DataTable Init */
		var targetDt = $('#fm_datable_1').DataTable({
			"dom": '<"row mt-1 justify-content-md-center"<"col-12"t>>',
			autoWidth: false,
			"ordering": true,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": [0, 5] // Disables sorting on 1st and 6th columns
			}],
			"order": [1, 'asc'],
			"bPaginate": false,
			"info": false,
			"bFilter": false,
			"drawCallback": function () {
				$('#fm_datable_1_wrapper').find('.pagination').addClass('custom-pagination pagination-simple justify-content-end');
			}
		});

		$('.pagination').addClass('custom-pagination pagination-simple justify-content-end');

		/* Select all using checkbox */
		var DT1 = $('#fm_datable_1').DataTable();

		$(".check-select-all").on("click", function (e) {
			$('.check-select').attr('checked', true);
			if ($(this).is(":checked")) {
				DT1.rows().select();
				$('.check-select').prop('checked', true);
			} else {
				DT1.rows().deselect();
				$('.check-select').prop('checked', false);
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
});