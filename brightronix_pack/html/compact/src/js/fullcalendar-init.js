//************************* UPDATED FILE *************************//

// src/js/calendar-init.js
import $ from 'jquery';
import moment from 'moment';
import 'daterangepicker';
import Swal from 'sweetalert2';

// FullCalendar Imports
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';


export const initCalendar = () => {

	// 1. Initialize DateRangePicker
	// We check length to avoid errors on pages without these inputs
	if ($('input[name="calendar"]').length) {
		$('input[name="calendar"]').daterangepicker({
			singleDatePicker: true,
			showDropdowns: false,
			minYear: 1901,
			cancelClass: "btn-secondary",
			autoApply: true,
			parentEl: "#inline_calendar", // Ensure this ID exists in your HTML
		});

		// Use a slight timeout to ensure DOM is fully painted if triggering click
		setTimeout(() => {
			$('input[name="calendar"]').trigger("click");
		}, 100);
	}

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

	// 2. Initialize FullCalendar
	const calendarEl = document.getElementById('calendar');

	if (calendarEl) {
		const curYear = moment().format('YYYY');
		const curMonth = moment().format('MM');
		let targetEvent;

		const calendar = new Calendar(calendarEl, {
			plugins: [
				dayGridPlugin,
				timeGridPlugin,
				listPlugin,
				interactionPlugin,
				bootstrap5Plugin
			],
			initialView: 'dayGridMonth',
			initialDate: `${curYear}-${curMonth}-07`,
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
			},
			themeSystem: 'bootstrap5',
			height: 'parent',
			droppable: true,
			editable: true,
			events: [
				{
					backgroundColor: '#FFC400',
					borderColor: '#FFC400',
					title: 'Conference',
					start: `${curYear}-${curMonth}-04`,
					end: `${curYear}-${curMonth}-06`,
				},
				{
					title: 'Meeting',
					start: `${curYear}-${curMonth}-13`,
				}
				// ... Add rest of your events here
			],
			// Event Click Handling
			eventClick: function (info) {
				targetEvent = info.event;
				const targetDrawer = '.hk-drawer.calendar-drawer';

				// Show Drawer logic
				if ($(targetDrawer).length) {
					$(targetDrawer).css({ "border": "none", "box-shadow": "0 8px 10px rgba(0, 0, 0, 0.1)" }).addClass('drawer-toggle');
					$('.calendar-drawer').find('.event-name').text(targetEvent.title);
				} else {
					console.warn("Drawer element .hk-drawer.calendar-drawer not found");
				}

				if (info.event.url) {
					info.jsEvent.preventDefault();
					window.open(info.event.url);
				}
			}
		});

		calendar.render();

		// 3. UI Customization (Wait for render)
		setTimeout(() => {
			// Add custom toggle button
			const toolbar = document.querySelector('.fc-header-toolbar');
			if (toolbar) {
				const toggleDiv = document.createElement('div');
				toggleDiv.className = 'hk-sidebar-togglable';
				toolbar.appendChild(toggleDiv);
			}

			// Fix buttons style
			$('.fc-prev-button, .fc-next-button').addClass('btn-icon btn-flush-dark btn-rounded flush-soft-hover');
			$('.fc-today-button').removeClass('btn-primary').addClass('btn-outline-light');
		}, 100);

		// 4. Delete Event Logic
		$(document).on("click", '#del_event', function (e) {
			e.preventDefault();
			$(this).closest('.hk-drawer').removeClass('drawer-toggle');

			Swal.fire({
				html: '<h5 class="text-danger">Delete Note?</h5>',
				showCancelButton: true,
				confirmButtonText: 'Yes, Delete',
				cancelButtonText: 'No',
				customClass: {
					confirmButton: 'btn btn-danger',
					cancelButton: 'btn btn-secondary'
				}
			}).then((result) => {
				if (result.isConfirmed && targetEvent) {
					targetEvent.remove();
					Swal.fire('Deleted!', 'Event has been deleted.', 'success');
				}
			});
		});

		// 5. Add Event Logic
		$(document).on("click", "#add_event", function (e) {
			e.preventDefault();

			calendar.addEvent({
				backgroundColor: $('.cal-event-color').val() || '#3a57e8',
				title: $('.cal-event-name').val() || 'New Event',
				start: $('.cal-event-date-start').val() || moment().format('YYYY-MM-DD'),
				end: $('.cal-event-date-end').val()
			});

			Swal.fire({
				toast: true,
				position: 'bottom',
				icon: 'success',
				title: 'Event Created',
				showConfirmButton: false,
				timer: 2000
			});

			$('.cal-event-name').val("");
		});
	}
}