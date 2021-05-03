(function ($, app) {
	'use strict';

	$.getJSON("/static/json/flights.json", function(data) {
		init(data)
	});

	function init(data) {
		var cart = new app.Cart($('#cart')),
			filter = new app.Filter($('#filter')),
			boardingFlights = new app.Flights(data.boarding, $('#trip'), 'boarding'),
			returningFlights = new app.Flights(data.returning, $('#trip'), 'returning');

		boardingFlights.setDefaultSelection();
		returningFlights.setDefaultSelection();

		$('#filter-toggler').on('click', function () {
			filter.toggleVisibility();
		})
	}
})(window.jQuery, window.app);

