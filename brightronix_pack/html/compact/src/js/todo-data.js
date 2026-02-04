//************************* UPDATED FILE *************************//

import $ from 'jquery';
import 'jquery.repeater';
import dragula from 'dragula';
import ApexCharts from 'apexcharts';
import moment from 'moment';
import 'daterangepicker';

export const initTodo = () => {
	console.log("🚀 Todo Init Started");

	// ==========================================
	// 1. REPEATER (Form Repetition)
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
	// 2. TINYMCE (Inline Editing)
	// ==========================================
	// We use window.tinymce (CDN) to avoid Vite build errors
	if (typeof window.tinymce !== 'undefined' && $('.editable').length > 0) {

		let edCnt = 0;
		$('.editable').each(function () {
			$(this).attr('id', 'editable_' + edCnt);
			edCnt++;
		});

		// Helper Functions
		const getEditorStatus = (editorId) => {
			return window.tinymce.get(editorId).mode.get();
		};

		const toggleEditorStatus = (editorId, currentStatus) => {
			if (currentStatus === "design") {
				window.tinymce.get(editorId).mode.set("readonly");
			} else {
				window.tinymce.get(editorId).mode.set("design");
			}
		};

		const enableDisable = (targetEditor) => {
			const status = getEditorStatus(targetEditor);
			toggleEditorStatus(targetEditor, status);
		};

		// Init Editor
		window.tinymce.init({
			selector: '.editable',
			inline: true,
			readonly: true,
			toolbar: false,
			menubar: false,
		});

		// Event Handlers
		let selId;
		$(document).on("click", ".edit-tyn", function (e) {
			const wrap = $(this).closest('.inline-editable-wrap');
			selId = wrap.find('.editable').attr('id');

			$(this).css('visibility', 'hidden');
			const el = document.getElementById(selId);

			if (el) {
				const range = document.createRange();
				const sel = window.getSelection();
				range.selectNodeContents(el);
				range.collapse(false);
				sel.removeAllRanges();
				sel.addRange(range);
				el.focus();
				enableDisable(selId);
			}
			return false;
		});

		$(document).on("focusout", ".editable", function (e) {
			if (selId) {
				// Slight delay to ensure click events finish
				setTimeout(() => {
					enableDisable(selId);
					$('.edit-tyn').css('visibility', 'visible');
				}, 200);
			}
		});

	} else {
		if ($('.editable').length > 0) {
			console.warn("⚠️ TinyMCE not found. Ensure the CDN script is in index.html");
		}
	}

	// ==========================================
	// 3. APEXCHARTS (Radial)
	// ==========================================
	const chartEl = document.querySelector("#sparkline_chart_7");
	if (chartEl) {
		const options6 = {
			series: [85],
			chart: {
				type: 'radialBar',
				width: 50,
				height: 50,
				sparkline: { enabled: true }
			},
			colors: ['#007D88'],
			dataLabels: { enabled: false },
			plotOptions: {
				radialBar: {
					hollow: { margin: 0, size: '80%' },
					track: { margin: 0, strokeWidth: '97%' },
				}
			},
			labels: ['8/12'],
		};

		const chart6 = new ApexCharts(chartEl, options6);
		chart6.render();
	}

	// ==========================================
	// 4. DRAGULA (Drag & Drop)
	// ==========================================
	const todoList1 = document.getElementById("todo_list");
	const todoList2 = document.getElementById("todo_list_1");

	// Only init if at least one container exists
	const containers = [todoList1, todoList2].filter(el => el !== null);

	if (containers.length > 0) {
		try {
			const dragulaInit = (typeof dragula === 'function') ? dragula : dragula.default;
			dragulaInit(containers);
		} catch (e) {
			console.error("❌ Dragula Init Failed:", e);
		}
	}

	// ==========================================
	// 5. CHECKBOX SELECTION LOGIC
	// ==========================================
	$(".advance-list .form-check-input").on("click", function (e) {
		if ($(this).is(":checked")) {
			$(this).closest('li').addClass('selected');
		} else {
			$(this).closest('li').removeClass('selected');
		}
	});

	// ==========================================
	// 6. DATEPICKER
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
};