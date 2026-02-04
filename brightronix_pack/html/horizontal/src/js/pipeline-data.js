//************************* UPDATED FILE *************************//

import $ from 'jquery';
import dragula from 'dragula';
import moment from 'moment';
import 'daterangepicker';

export const initPipeline = () => {
	console.log("🚀 Pipeline Init Started");

	// ==========================================
	// 1. DRAG & DROP (Dragula)
	// ==========================================
	try {
		// Collect all potential column IDs
		const containers = [
			document.getElementById("j1"),
			document.getElementById("j2"),
			document.getElementById("j3"),
			document.getElementById("j4"),
			document.getElementById("j5"),
			document.getElementById("j6")
		].filter(el => el !== null);

		const dragulaInit = (typeof dragula === 'function') ? dragula : dragula.default;

		if (containers.length > 0 && dragulaInit) {
			dragulaInit(containers);

			const taskListWrap = document.getElementById("tasklist_wrap");
			if (taskListWrap) {
				dragulaInit([taskListWrap], {
					moves: function (el, container, handle) {
						return handle.classList.contains('spipeline-handle');
					}
				});
			}
			console.log("✅ Dragula Initialized");
		}
	} catch (e) {
		console.error("❌ Dragula Failed:", e);
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
			locale: { format: 'YYYY-MM-DD' }
		});
	}

	// ==========================================
	// 3. ADD DEAL / TASK
	// ==========================================

	// A. Open Modal & Store Target Column
	$(document).on("click", ".btn-add-newtask", function (e) {
		// Clear inputs
		$('.add-new-task input.form-control').val("");

		// Find the specific column where we clicked "Add Card"
		const $targetColumn = $(this).closest('.spipeline-list').find(".tasklist-cards-wrap");

		// Save this target to the modal so we know where to append later
		$('#add_new_deal').data('target-col', $targetColumn);
	});

	// B. Save Deal (Click "Add" in Modal)
	$(document).on("click", ".btn-add-task", function (e) {
		e.preventDefault();

		// Retrieve the column we stored earlier
		const $targetColumn = $('#add_new_deal').data('target-col');

		if (!$targetColumn || $targetColumn.length === 0) {
			console.error("❌ Error: Target column not found.");
			return;
		}

		// Get Input Values
		let taskName = $('.add-new-task input.task-name').val() || "Dummy Task";
		let estCost = $('.add-new-task input.est-cost').val() || "1234";

		const htmlBlock = `
            <div class="card card-border spipeline-card">
                <div class="card-body">
                    <div class="card-action-wrap">
                        <a class="btn btn-xs btn-icon btn-rounded btn-primary dropdown-toggle no-caret" href="#" data-bs-toggle="dropdown">
                            <span class="icon">
                                <span class="feather-icon"><i data-feather="chevron-right"></i></span>
                            </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-icon-text dropdown-menu-end spipeline-dropdown">
                            <h6 class="dropdown-header text-muted">Scheduled activity</h6>
                            <a class="dropdown-item" href="#">
									<div class="d-flex align-items-center">
										<div class="me-3 position-relative text-disabled">
											<i class="ri-checkbox-blank-circle-line"></i>
										</div>
										<div class="mw-175p">
											<div class="h6 mb-0 text-truncate">Call arranged with James</div>
											<p class="dropdown-item-text text-truncate text-danger">Yesterday 4:30 pm</p>
										</div>
										<div class="avatar avatar-icon avatar-xxs avatar-soft-danger avatar-rounded ms-3">
											<span class="initial-wrap">
												<span class="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span>
											</span>
										</div>
									</div>
								</a>
								<a class="dropdown-item" href="#">
									<div class="d-flex align-items-center">
										<div class="me-3 position-relative text-disabled">
											<i class="ri-checkbox-blank-circle-line"></i>
										</div>
										<div class="mw-175p">
											<div class="h6 mb-0 text-truncate">Call arranged with Locus</div>
											<p class="dropdown-item-text text-truncate">21 Jan 20, 12:40 pm</p>
										</div>
										<div class="avatar avatar-icon avatar-xxs avatar-light avatar-rounded ms-3">
											<span class="initial-wrap">
												<span class="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span>
											</span>
										</div>
									</div>
								</a>
								<a class="dropdown-item" href="#">
									<div class="d-flex align-items-center">
										<div class="me-3 position-relative text-disabled">
											<i class="ri-checkbox-blank-circle-line"></i>
										</div>
										<div class="mw-175p">
											<div class="h6 mb-0 text-truncate">Demo arranged with Locus strong</div>
											<p class="dropdown-item-text text-truncate">9 Nov 20, 9:40 am</p>
										</div>
										<div class="avatar avatar-icon avatar-xxs avatar-soft-primary avatar-rounded ms-3">
											<span class="initial-wrap">
												<span class="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-monitor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></span>
											</span>
										</div>
									</div>
								</a>
                        </div>
                    </div>
                    
                    <div class="media">
                        <div class="media-head">
                            <div class="avatar avatar-logo avatar-rounded">
                                <span class="initial-wrap">
                                    <img src="/src/assets/img/symbol-avatar-4.png" alt="logo"> 
                                </span>
                            </div>
                        </div>
                        <div class="media-body">
                            <div class="brand-name">${taskName}</div>
                            <div class="price-estimation">$${estCost}</div>
                            <div class="brand-cat">Dashboard Template</div>
                        </div>
                    </div>
                </div>
            </div>`;

		$(htmlBlock).appendTo($targetColumn);

		// Refresh Icons
		if (window.feather) window.feather.replace();

		// Close Modal
		const modalEl = document.getElementById('add_new_deal');
		if (modalEl) {
			const modalInstance = bootstrap.Modal.getInstance(modalEl);
			if (modalInstance) modalInstance.hide();
		}
	});

	// ==========================================
	// 4. PIPELINE COLUMN MANAGEMENT
	// ==========================================

	let $pipelineTitleElement = null;

	// A. Edit Pipeline Title (Open Modal)
	$(document).on("click", ".edit-tasklist", function (e) {
		e.preventDefault();
		const $container = $(this).closest('.spipeline-handle');
		$pipelineTitleElement = $container.find('h6');

		// Set value in modal
		$('.edit-tasklist-modal input').val($pipelineTitleElement.text());
	});

	// B. Save Pipeline Title
	$(document).on("click", ".btn-edit-tasklist", function (e) {
		e.preventDefault();
		if ($pipelineTitleElement) {
			$pipelineTitleElement.text($('.edit-tasklist-modal input').val());
		}
		$(this).closest('.modal').modal('hide'); // jQuery fallback close

		// Bootstrap 5 Close (Robust)
		const modalEl = document.getElementById('edit_task_list');
		if (modalEl) {
			const instance = bootstrap.Modal.getInstance(modalEl);
			if (instance) instance.hide();
		}
	});

	// C. Delete Pipeline Column
	$(document).on("click", ".delete-tasklist", function (e) {
		e.preventDefault();
		$(this).closest('.spipeline-list').remove();
	});

	// D. Clear All Cards in Column
	$(document).on("click", ".clear-tasklist", function (e) {
		e.preventDefault();
		$(this).closest('.spipeline-list').find('.spipeline-card').remove();
	});

	// ==========================================
	// 5. ADD NEW PIPELINE COLUMN
	// ==========================================

	// A. Reset Input
	$(document).on("click", ".btn-add-newlist", function (e) {
		$('.add-tasklist-modal input.form-control').val("");
	});

	// B. Save New Column
	$(document).on("click", ".btn-add-tasklist", function (e) {
		e.preventDefault();

		let taskListName = $('.add-tasklist-modal input.form-control').val();
		if (!taskListName) taskListName = "New Stage";

		// Generate Unique ID for Dragula
		const uniqueId = 'stage_' + Date.now();

		const htmlBlock = `
        <div class="card card-simple card-flush spipeline-list">
            <div class="card-header card-header-action">
                <div class="spipeline-handle">
                    <h6 class="hd-uppercase mb-0">${taskListName}</h6>
                    <div class="card-action-wrap">
                        <a class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret" href="#" data-bs-toggle="dropdown">
                            <span class="icon">
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
                <div>
                    <span>
                        <span class="overall-estimation">$0</span>
                        <span class="spipeline-dot-sep">●</span>
                        <span class="lead-count">4 Leads</span>
                    </span>
                </div>
                <button class="btn btn-light btn-block btn-wth-icon text-primary btn-add-newtask" data-bs-toggle="modal" data-bs-target="#add_new_deal">
                    <span>
                        <span class="icon">
                            <span class="feather-icon"><i data-feather="plus"></i></span>
                        </span>
                        <span class="btn-text">Add Card</span>
                    </span>
                </button>
            </div>
            <div class="card-body">
                <div id="${uniqueId}" class="tasklist-cards-wrap"></div>
            </div>
        </div>`;

		// Insert before the "Create New List" button wrapper
		$(htmlBlock).insertBefore($('.create-new-list'));

		// Refresh Icons
		if (window.feather) window.feather.replace();

		// Close Modal
		const modalEl = document.getElementById('add_task_list'); // Make sure ID matches your HTML
		if (modalEl) {
			const instance = bootstrap.Modal.getInstance(modalEl);
			if (instance) instance.hide();
		}
	});
};