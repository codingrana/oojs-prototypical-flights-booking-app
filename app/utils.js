(function(window, _) {
    'use strict';

    window.app = window.app || {};
    window.app.utils = {
        getHMtime: getHMtime,
        getDateDifferenceInHM: getDateDifferenceInHM,
        getIndFormattedNo: getIndFormattedNo,
        getListSortedBy: getListSortedBy
    }

    function getHMtime(timestamp) {
        var dateTime = new Date(parseInt(timestamp));
        return getZeroAppended(dateTime.getHours()) + ':' + getZeroAppended(dateTime.getMinutes());
    }

    function getDateDifferenceInHM(toTimestamp, fromTimestamp) {
        var diff = parseInt(toTimestamp) - parseInt(fromTimestamp),
            diffInMins = diff / 1000 / 60;

        return getZeroAppended(parseInt(diffInMins / 60)) + 'h :' + getZeroAppended(parseInt(diffInMins % 60)) + 'm';
    }

    function getZeroAppended(value) {
        return value.toString().length === 1 ? '0'+value : value;
    }

    function getIndFormattedNo(number) {
        return number.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    }

    function getListSortedBy(list, sortBy) {
        return _.clone(list).sort(getSortCallback(sortBy));
    }

    function getSortCallback(sortBy) {
        return function(prev, current) {
            if (prev[sortBy] < current[sortBy])
                return -1;
            if (prev[sortBy] > current[sortBy])
                return 1;
            return 0;
        }
    }

})(window, window._);
