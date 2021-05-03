(function(window, utils) {
    'use strict';

    window.app = window.app || {};
    window.app.Flights = Flights;

    function Flights(flights, target, base) {
        app.Component.call(this, target);
        this.flights = flights;
        this.orgList = this.flights.list;
        this.base = base;
        this.prevSelectionId;

        this.setTemplate();
        this.appendElem();
    }

    Flights.prototype = Object.create(app.Component.prototype);
    Flights.prototype.constructor = Flights;

    Flights.prototype.setTemplate = function() {
        var _this = this;
        var elem = this.createElem('<div class="trips">\
                            <h4 class="rP">Mumbai - New Delhi</h4>\
                            <div class="sorts">\
                                <a href="#" class="sort-trip2" >\
                                    departs\
                                </a>\
                                <a href="#" class="sort-trip2 middle" >\
                                    arrives\
                                </a>\
                                <a href="#" class="sort-trip2 last" >\
                                    price\
                                </a>\
                            </div>\
                            <ul class="flights" id="trip1-list">\
                                ' + this.getDomList(this.flights.list).join('') + '\
                            </ul>\
                        </div>');

        this.attachEvent(elem.find('div.sorts a'), 'click', sortHandler);
        this.registerSelection(elem.find('ul.flights li'));
        this.handleFiltering();

        function sortHandler(ev) {
            var elem = _this.getElem(this);
            var toggleClass = 'asc';
            _this.sortTable.call(_this, this.text.trim(), _this.hasClass(elem, toggleClass));
            _this.toggleClass(elem, toggleClass)
        }
    };

    Flights.prototype.getDomList = function(flights) {
        var _this = this;
        var haveSelectionInList;
        if (flights.length < 1) {
            this.emitEvent('selection-change');
            return 'No Flights';
        }

        var listDom = flights.map(function(flight) {
            var selection = flight.id === _this.prevSelectionId ? 'selected' : '';
            if (selection && !haveSelectionInList) {
                haveSelectionInList = true;
            }
            return '<li class="' + selection + '">\
                    <div class="flight-icons ' + flight.airline + '">\
                    </div>\
                    <div class="flight-details">\
                        <div class="time">' + utils.getHMtime(flight.departs) + ' - ' + utils.getHMtime(flight.arrives) + '</div>\
                        <div class="name">' + flight.name + '</div>\
                        <div class="duration">' + utils.getDateDifferenceInHM(flight.arrives, flight.departs) + '</div>\
                    </div>\
                    <div class="trip-fare">Rs. ' + utils.getIndFormattedNo(flight.price) + '</div>\
                    <div class="fare">' + flight.price + '</div>\
                    <div class="departs">' + flight.departs + '</div>\
                    <div class="arrives">' + flight.arrives + '</div>\
                    <div class="cb"><span class="cbid">' + flight.id + '</span></div>\
                </li>';
        });

        if (!haveSelectionInList) {
            this.emitEvent('selection-change');
        } else {
            this.emitEvent('selection-change', true)
        }

        return listDom;
    };

    Flights.prototype.registerSelection = function(elem) {
        var _this = this;
        this.attachEvent(elem, 'click', itemClickHandler);

        function itemClickHandler(ev) {
            var elem = _this.getElem(this);
            var emitParamObj = {};
            emitParamObj[_this.base] = elem.find('.fare').text().trim();
            elem.siblings().removeClass('selected');
            elem.addClass('selected');
            _this.emitEvent('selection-change', [emitParamObj]);
            _this.prevSelectionId = parseInt(elem.find('.cbid').text());
        }
    };

    Flights.prototype.sortTable = function(sortBy, reverse) {
        var sortedList = utils.getListSortedBy(this.flights.list, sortBy);
        this.flights.list = reverse ? sortedList.reverse() : sortedList;
        this.redrawTable();
    };

    Flights.prototype.redrawTable = function(list) {
        var listHolder = this.elem.find('ul.flights');
        this.elem.find('ul.flights').empty();
        this.appendElem(this.getDomList(list || this.flights.list), listHolder);
        this.registerSelection(listHolder.find('li'));
    };

    Flights.prototype.setDefaultSelection = function() {
        this.emitEvent('click', null, this.elem.find('ul.flights li').first())
    };

    Flights.prototype.handleFiltering = function() {
        this.attachDynEvent('filter-list', function(ev, filters) {
            /*TODO: Make configurable with meta data*/
            var _this= this;
            this.flights.list = this.orgList.filter(function(item) {
                var hasAirlines = function() {
                    if (filters.airlines.length === 0) {
                        return true
                    } else {
                        return filters.airlines.indexOf(item.airlineCode) > -1;
                    }
                }

                var arrivalFilter = function() {
                    return _this.getTimeFilterd(item, filters.arrivals)
                }

                var departureFilter = function() {
                    return _this.getTimeFilterd(item.departs, filters.departs)
                }

                return hasAirlines() && arrivalFilter() && departureFilter();
            });

            this.redrawTable(this.flights.list);

        }.bind(this));
    };

    Flights.prototype.getTimeFilterd = function(timeStamp, option) {
        var date = new Date(timeStamp);
        var hour = date.getHours();
        switch (option) {
            case "0":
                return true;

            case "1": // before 8am
                return hour < 8;

            case "2": // 8am to 12pm
                return hour > 8 && hour < 12;

            case "3": // 12am to 4pm
                return hour > 12 && hour < 16;

            case "4": // 4pm to 8pm
                return hour > 16 && hour < 20;

            case "5": // after 8pm
                return hour > 20;

        }
    }

})(window, window.app.utils);
