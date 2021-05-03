(function(window, $) {
    'use strict';

    window.app = window.app || {};
    window.app.Component = Component;

    function Component(target) {
        this.target = target;
        this.elem = '';
    }

    Component.prototype.attachEvent = function(elem, eventName, callback) {
        elem.off(event, callback).on(eventName, callback);
    }

    Component.prototype.createElem = function(elem, noUpdate) {
        var elem = $(elem);
        if (noUpdate) {
        	return elem;
        } else {
        	this.elem = elem;
        	return this.elem;
        }
    }

    Component.prototype.appendElem = function(elem, target) {
        target = target || this.target;
        target.append(elem || this.elem);
        return this.elem;
    }

    Component.prototype.getElem = function(elem) {
        return $(elem);
    }

    Component.prototype.hasClass = function(elem, classToCheck) {
        return elem.hasClass(classToCheck);
    }

    Component.prototype.toggleClass = function(elem, toggleClass) {
        return elem.toggleClass(toggleClass);
    }

    Component.prototype.emitEvent = function(eventName, params, elem) {
        if (elem) {
        	elem.trigger(eventName, params)
        } else {
        	$(document).trigger(eventName, params);
        }
    }

    Component.prototype.attachDynEvent = function(eventName, callback) {
        $(document).off(eventName, callback).on(eventName, callback);

    }
})(window, window.jQuery);
