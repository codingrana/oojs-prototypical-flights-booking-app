(function(window, utils) {
    'use strict';

    window.app = window.app || {};
    window.app.Cart = Cart;

    function Cart(target) {
        app.Component.call(this, target);
        this.setTemplate();
        this.appendElem();
    }

    Cart.prototype = Object.create(app.Component.prototype);
    Cart.prototype.constructor = Cart;

    Cart.prototype.setTemplate = function() {
        var elem = this.createElem('<div class="price">\
                        <h3 id="totalfare" class="totalfare"></h3>\
                        <span class="totalfare-int">6772</span>\
                        <span>includes all charges (<a id="fbup">fare breakup</a>)</span>\
                    </div>\
                    <div class="buy">\
                        <button>Book</button>\
                    </div>');
        this.registerSelectionChange()
    };

    Cart.prototype.registerSelectionChange = function() {
        var boardingFlightRate = 0,
            returningFlightRate = 0,
            previousFare = 0,
            _this = this;
        this.attachDynEvent('selection-change', function(ev, fareObj) {
            if (!fareObj) {
                _this.elem.hide();
                return;
            } else {
                _this.elem.show();
            }
            if (typeof fareObj === "object") {
                boardingFlightRate = fareObj['boarding'] && parseInt(fareObj['boarding']) || boardingFlightRate;
                returningFlightRate = fareObj['returning'] && parseInt(fareObj['returning']) || returningFlightRate;

                var totalRate = boardingFlightRate + returningFlightRate;
                if (previousFare !== totalRate) {
                    _this.updateFare(totalRate, previousFare);
                    previousFare = totalRate;
                }
            }
        })
    };

    Cart.prototype.updateFare = function(fare, prevFare) {
        var updationLimit,
            fareHolder = this.elem.find('#totalfare'),
            fareDiff = fare - prevFare || fare,
            changeFromPrev = Math.abs(fareDiff),
            i;

        if (fareDiff < 0) {
            prevFare = prevFare - fare > 300 ? fare + 300 : prevFare;
            for (i = prevFare; i >= fare; i--) {
                updateWithEffect(i);
            }
        } else {
            prevFare = fare - prevFare > 300 ? fare - 300 : prevFare;
            for (i = prevFare; i <= fare; i++) {
                updateWithEffect(i);
            }
        }

        function updateWithEffect(amount) {
            setTimeout(function() {
                fareHolder.text('Rs. ' + utils.getIndFormattedNo(Math.abs(amount)));
            }, 0)
        }
    };

})(window, window.app.utils);
