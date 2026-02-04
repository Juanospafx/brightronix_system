//************************* UPDATED FILE *************************//
import $ from 'jquery';
// Fix for Dragula import in some Vite environments
import dragula from 'dragula';
import 'dragula/dist/dragula.css';

import moment from 'moment';
import 'daterangepicker';
import PerfectScrollbar from 'perfect-scrollbar';
// import 'perfect-scrollbar/css/perfect-scrollbar.css';
import ApexCharts from 'apexcharts';

export const initKanban = () => {
	console.log("🚀 Kanban Init Started");

	// --- 1. DEBUG: Check for Element Existence ---
	const col1 = document.getElementById("i1");
	if (!col1) {
		console.error("❌ Error: Kanban Column 'i1' not found in HTML. Script stopped.");
		return; // Stop execution if HTML is missing
	} else {
		console.log("✅ HTML Elements found.");
	}

	// --- 2. Initialize Dragula ---
	try {
		const containers = [
			document.getElementById("i1"),
			document.getElementById("i2"),
			document.getElementById("i3"),
			document.getElementById("i4")
		].filter(el => el !== null);

		// Check if dragula is imported correctly (Function vs Object issue)
		const dragulaInit = (typeof dragula === 'function') ? dragula : dragula.default;

		if (containers.length > 0 && dragulaInit) {
			dragulaInit(containers);

			const taskListWrap = document.getElementById("tasklist_wrap");
			if (taskListWrap) {
				dragulaInit([taskListWrap], {
					moves: function (el, container, handle) {
						return handle.classList.contains('tasklist-handle');
					}
				});
			}
			console.log("✅ Dragula Initialized");
		}
	} catch (e) {
		console.error("❌ Dragula Failed:", e);
	}

	// --- 3. DateRangePicker ---
	try {
		if ($('input[name="single-date-pick"]').length) {
			$('input[name="single-date-pick"]').daterangepicker({
				singleDatePicker: true,
				startDate: moment().startOf('hour'),
				showDropdowns: true,
				minYear: 1901,
				cancelClass: "btn-secondary",
				locale: { format: 'YYYY-MM-DD' }
			});
			console.log("✅ DateRangePicker Initialized");
		}
	} catch (e) {
		console.error("❌ DateRangePicker Failed:", e);
	}

	// --- 4. TinyMCE (Editor) ---
	// We access window.tinymce because it is loaded via CDN
	if (typeof window.tinymce !== 'undefined' && $('.editable').length > 0) {
		console.log("✅ TinyMCE found, initializing...");

		// Add IDs to editable elements
		let edCnt = 0;
		$('.editable').each(function () {
			$(this).attr('id', 'editable_' + edCnt);
			edCnt++;
		});

		window.tinymce.init({
			selector: '.editable',
			inline: true,
			readonly: true,
			toolbar: false,
			menubar: false,
		});

		// TinyMCE Interaction Logic
		let selId;
		const enableDisable = (id) => {
			const editor = window.tinymce.get(id);
			if (editor) {
				const mode = editor.mode.get();
				editor.mode.set(mode === 'design' ? 'readonly' : 'design');
			}
		};

		$(document).on("click", ".edit-tyn", function (e) {
			e.preventDefault();
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
		});

		$(document).on("focusout", ".editable", function (e) {
			if (selId) {
				setTimeout(() => {
					enableDisable(selId);
					$('.edit-tyn').css('visibility', 'visible');
				}, 200);
			}
		});

	} else {
		console.warn("⚠️ TinyMCE skipped: Library not found or no .editable elements.");
	}

	// --- 5. ApexCharts ---
	try {
		const chartElement = document.querySelector("#sparkline_chart_7");
		if (chartElement) {
			const options6 = {
				series: [85],
				chart: {
					type: 'radialBar',
					width: 50,
					height: 50,
					sparkline: { enabled: true }
				},
				colors: ['#007D88'],
				plotOptions: {
					radialBar: {
						hollow: { margin: 0, size: '80%' },
						track: { margin: 0, strokeWidth: '97%' },
						dataLabels: { enabled: false }
					}
				},
				labels: ['8/12'],
			};
			const chart6 = new ApexCharts(chartElement, options6);
			chart6.render();
			console.log("✅ ApexCharts Rendered");
		}
	} catch (e) {
		console.error("❌ ApexCharts Failed:", e);
	}

	// --- 6. Perfect Scrollbar ---
	const kbScroll = document.querySelector('#kb_scroll');
	if (kbScroll) {
		new PerfectScrollbar('#kb_scroll', { suppressScrollY: true });
	}

	// --- 7. Task Event Handlers ---
	// (Attach only once to prevent duplicates if function runs twice)
	$(document).off("click", ".btn-add-newtask").on("click", ".btn-add-newtask", function () {
		$('.add-new-task input.form-control').val("");
		// Store the target column in data attribute of the modal for later use
		const targetList = $(this).closest('.tasklist').find(".tasklist-cards-wrap");
		$('#add_new_card').data('target-column', targetList);
	});

	$(document).off("click", ".btn-add-task").on("click", ".btn-add-task", function (e) {
		e.preventDefault();

		// Retrieve the stored target column
		const $targetColumn = $('#add_new_card').data('target-column');

		if (!$targetColumn || $targetColumn.length === 0) {
			console.error("❌ Could not determine which column to add task to");
			return;
		}

		let taskName = $('.add-new-task input.task-name').val() || "Dummy Task";

		const htmlBlock = `
            <div class="card card-border card-simple tasklist-card">
                <div class="card-header card-header-action">
                    <h6 class="fw-bold">${taskName}</h6>
                    <div class="card-action-wrap">
                        <a class="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret" href="#" data-bs-toggle="dropdown"><span class="btn-icon-wrap"><span class="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></span></span></a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#task_detail"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></span><span>Edit</span></a>
								<a class="dropdown-item" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span><span>Assign to</span></a>
								<a class="dropdown-item" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></span><span>Attach files</span></a>
								<a class="dropdown-item" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></span><span>Apply Labels</span></a>
								<a class="dropdown-item" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span><span>Set Due Date</span></a>
								<a class="dropdown-item" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></span><span>Follow Task</span></a>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></span><span>Set as Top Priority</span></a>
								<a class="dropdown-item" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg></span><span>Change Status</span></a>
								<a class="dropdown-item" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pocket"><path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path><polyline points="8 10 12 14 16 10"></polyline></svg></span><span>Save as Template</span></a>
								<a class="dropdown-item" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg></span><span>Move to archive</span></a>
								<a class="dropdown-item delete-task" href="#"><span class="feather-icon dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></span><span>Delete</span></a>
                        </div>
                    </div>
                </div>
            </div>`;

		$(htmlBlock).appendTo($targetColumn);

		// Close modal manually
		const modalEl = document.getElementById('add_new_card');
		// Assuming you have bootstrap js imported elsewhere or globally
		// $(modalEl).modal('hide'); // jQuery way

		// Native Bootstrap 5 way if jQuery fails
		const modalInstance = bootstrap.Modal.getInstance(modalEl);
		if (modalInstance) modalInstance.hide();
	});

	$(document).on("click", ".delete-task", function (e) {
		e.preventDefault();
		$(this).closest('.tasklist-card').remove();
	});

	// We need a variable to remember WHICH list title we are editing
	let $tasklistTitleElement = null;

	// --- A. Edit List (Opens Modal) ---
	$(document).on("click", ".edit-tasklist", function (e) {
		e.preventDefault();
		console.log("✏️ Edit List clicked");

		// 1. Find the title element in the column header
		const $container = $(this).closest('.tasklist-handle');
		$tasklistTitleElement = $container.find('.tasklist-name');

		// 2. Get current text
		const currentName = $tasklistTitleElement.text();
		console.log("Current Name:", currentName);

		// 3. Put text into the Modal Input
		// Make sure your Modal ID is correct. Usually #edit_task_list or class .edit-tasklist-modal
		const $modalInput = $('#edit_task_list input');

		if ($modalInput.length) {
			$modalInput.val(currentName);
		} else {
			console.error("❌ Error: Could not find modal input '#edit_task_list input'");
		}
	});

	// --- B. Save Edit (Inside Modal) ---
	$(document).on("click", ".btn-edit-tasklist", function (e) {
		e.preventDefault();
		console.log("💾 Save List clicked");

		// 1. Get new value from modal
		const $modalInput = $('#edit_task_list input');
		const newName = $modalInput.val();

		// 2. Update the Board UI
		if ($tasklistTitleElement && newName) {
			$tasklistTitleElement.text(newName);
		}

		// 3. Close the Modal (Bootstrap 5 way)
		const modalEl = document.getElementById('edit_task_list');
		if (modalEl) {
			// Try closing via jQuery first (if bs jquery plugin exists)
			// $(modalEl).modal('hide'); 

			// Fallback to Native Bootstrap
			const modalInstance = bootstrap.Modal.getInstance(modalEl);
			if (modalInstance) modalInstance.hide();
		}
	});

	// --- C. Delete List ---
	$(document).on("click", ".delete-tasklist", function (e) {
		e.preventDefault();
		console.log("🗑️ Delete List clicked");

		// Find the main column wrapper (.tasklist) and remove it
		$(this).closest('.tasklist').remove();
	});

	// --- D. Clear All Tasks in List ---
	$(document).on("click", ".clear-tasklist", function (e) {
		e.preventDefault();
		console.log("🧹 Clear All clicked");

		// Find the card wrapper and empty it
		$(this).closest('.tasklist').find('.tasklist-cards-wrap').empty();
	});

	//Add New List
	// A. Reset Input when Modal Opens
	$(document).on("click", ".btn-add-newlist", function (e) {
		// Find the input inside the modal with ID #add_task_list
		$('#add_task_list input').val("");
	});

	// B. Save New List (Clicking "Add" inside the modal)
	$(document).on("click", ".btn-add-tasklist", function (e) {
		e.preventDefault();
		console.log("➕ Add New List clicked");

		// 1. Get the name from the input
		const $input = $('#add_task_list input');
		let taskListName = $input.val();

		if (!taskListName) {
			taskListName = "New List"; // Default fallback
		}

		// 2. Define the HTML Structure
		// Note: We generate a unique ID based on timestamp to ensure no ID conflicts
		const uniqueId = 'list_' + new Date().getTime();

		const htmlBlock = `
            <div class="card card-simple card-border tasklist">
                <div class="card-header card-header-action">
                    <div class="tasklist-handle">
                        <h6 class="text-uppercase d-flex align-items-center mb-0">
                            <span class="tasklist-name">${taskListName}</span>
                            <span class="badge badge-pill badge-soft-violet ms-2">0</span>
                        </h6>
                        <div class="card-action-wrap">
                            <a class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret" href="#" data-bs-toggle="dropdown">
                                <span class="btn-icon-wrap">
                                    <span class="feather-icon"><i data-feather="more-horizontal"></i></span>
                                </span>
                            </a>
                            <div role="menu" class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item edit-tasklist" href="#" data-bs-toggle="modal" data-bs-target="#edit_task_list">Edit</a>
                                <a class="dropdown-item delete-tasklist" href="#">Delete</a>
                                <a class="dropdown-item clear-tasklist" href="#">Clear All</a>
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-white btn-block btn-wth-icon btn-add-newtask" data-bs-toggle="modal" data-bs-target="#add_new_card">
                        <span>
                            <span class="icon-label">
                                <span class="feather-icon"><i data-feather="plus"></i></span>
                            </span>
                        </span>
                    </button>
                </div>
                <div data-simplebar class="card-body">
                    <div id="${uniqueId}" class="tasklist-cards-wrap"></div>
                </div>
            </div>`;

		// 3. Insert the new list BEFORE the "Add List" button column
		// We look for the column containing the "Add New List" button
		const $addBtnWrapper = $('.btn-add-newlist').closest('div'); // Adjust selector based on your HTML structure

		// If your "Add List" button is wrapped in a specific div class (e.g. .add-new-task), use that:
		if ($('.add-new-task').length) {
			$(htmlBlock).insertBefore($('.add-new-task'));
		} else {
			// Fallback: append to the main wrapper
			$('#tasklist_wrap').append(htmlBlock);
		}

		// 4. Re-initialize Icons (if using Feather icons)
		if (window.feather) window.feather.replace();

		// 5. Close Modal
		const modalEl = document.getElementById('add_task_list');
		if (modalEl) {
			const modalInstance = bootstrap.Modal.getInstance(modalEl);
			if (modalInstance) modalInstance.hide();
		}
	});
};