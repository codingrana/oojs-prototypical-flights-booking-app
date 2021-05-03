(function(window, utils) {
    'use strict';

    window.app = window.app || {};
    window.app.Filter = Filter;

    function Filter(target) {
        app.Component.call(this, target);
        this.setTemplate();
        this.appendElem();
    }

    Filter.prototype = Object.create(app.Component.prototype);
    Filter.prototype.constructor = Filter;

    Filter.prototype.setTemplate = function() {
        var elem = this.createElem('\
                    <form method="post" action="results.html">\
                        <div class="settingsArea">\
                            <fieldset class="filter">\
                                <legend>Departure time</legend>\
                                <select id="departs">\
                                    <option value="0">Anytime</option>\
                                    <option value="1">Early (Before 8am)</option>\
                                    <option value="2">Morning (8am - 12pm)</option>\
                                    <option value="3">Afternoon (12pm - 4pm)</option>\
                                    <option value="4">Evening (4pm - 8pm)</option>\
                                    <option value="5">Night (After 8pm)</option>\
                                </select>\
                            </fieldset>\
                            <fieldset class="filter">\
                                <legend>Return time</legend>\
                                <select id="arrivals">\
                                    <option value="0">Anytime</option>\
                                    <option value="1">Early (Before 8am)</option>\
                                    <option value="2">Morning (8am - 12pm)</option>\
                                    <option value="3">Afternoon (12pm - 4pm)</option>\
                                    <option value="4">Evening (4pm - 8pm)</option>\
                                    <option value="5">Night (After 8pm)</option>\
                                </select>\
                            </fieldset>\
                            <fieldset class="filter stations">\
                                <legend>Preferred Airlines</legend>\
                                <label for="AI"><input id="AI" type="checkbox" value="AI" name="airline_codes"><span class="airlogo fAI"></span> <span>Air India</span></label>\
                                <label for="IC"><input id="IC" type="checkbox" value="IC" name="airline_codes"><span class="airlogo fIC"></span> <span>Air India IC</span></label>\
                                <label for="G8"><input id="G8" type="checkbox" value="G8" name="airline_codes"><span class="airlogo fG8"></span> <span>GoAir</span></label>\
                                <label for="6E"><input id="6E" type="checkbox" value="6E" name="airline_codes"><span class="airlogo f6E"></span> <span>IndiGo</span></label>\
                                <label for="9W"><input id="9W" type="checkbox" value="9W" name="airline_codes"><span class="airlogo f9W"></span> <span>Jet Airways</span></label>\
                                <label for="9W-K"><input id="9W-K" type="checkbox" value="9W-K" name="airline_codes"><span class="airlogo f9W-K"></span> <span>Jet Airways Konnect</span></label>\
                                <label for="S2"><input id="S2" type="checkbox" value="S2" name="airline_codes"><span class="airlogo fS2"></span> <span>JetLite</span></label>\
                                <label for="IT"><input id="IT" type="checkbox" value="IT" name="airline_codes"><span class="airlogo fIT"></span> <span>Kingfisher</span></label>\
                                <label for="IT-RED"><input id="IT-RED" type="checkbox" value="IT-RED" name="airline_codes"><span class="airlogo fIT-RED"></span> <span>Kingfisher Red</span></label>\
                                <label for="SG"><input id="SG" type="checkbox" value="SG" name="airline_codes"><span class="airlogo fSG"></span> <span>SpiceJet</span></label>\
                            </fieldset>\
                        </div>\
                            <p class="action"><button type="button" id="applyFilter" >Filter flights</button></p>\
                    </form>');

        this.attachEvent(elem.find('.action'), 'click', this.handleFiltering.bind(this));
    };

    Filter.prototype.toggleVisibility = function () {
        this.elem.parent().toggle();
    }

    Filter.prototype.handleFiltering = function (ev) {
        var filters = {};
        filters.departs = this.elem.find('#departs').val();
        filters.arrivals = this.elem.find('#arrivals').val();
        filters.airlines = [];
        this.elem.find('input[name="airline_codes"]:checked').map(function (index, item) {
            filters.airlines.push(item.value);
        });
        this.emitEvent('filter-list', [filters])
        this.toggleVisibility();
    }

})(window, window.app.utils);
