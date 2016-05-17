/**
 * Created by hgehlhausen on 1/27/16.
 * @author hgehlhausen
 */
(function () {
    angular.module('services')
        .factory('SkillColumnManager', mgrFactory);
    mgrFactory.$inject = ['SkillColumn'];
    function mgrFactory(SkillColumn) {
        function SkillColumnManager(columns) {
            var mgr = this;
            if (angular.isArray(columns)) {
                mgr.cols = columns;
            } else {
                mgr.cols = [];
            }
            mgr.trackSkills = {};
            mgr.getTotalRanks = getTotalRanks;
            mgr.getSkillTotals = getSkillTotals;
            mgr.getBonus = getBonus;
            mgr.getColumnBonus = getColumnBonus;
            mgr.firstResult = firstResult;
            mgr.sort = sort;
            mgr.rotate = rotate;
            mgr.isUniqueSkill = isUniqueSkill;
            mgr.searchForSkillByColumn = searchForSkillByColumn;
            mgr.eachColumn = eachColumn;
            mgr.addNewColumn = addNewColumn;
            mgr.removeColumn = removeColumn;
            mgr.resetCols = resetCols;
            mgr.importCols = importCols;
            mgr.fromJSON = fromJSON;
            mgr.fromCsv = fromCsv;
            mgr.getTallestColumn = getTallestColumn;
            mgr._rotateArray = _rotateArray;
            mgr.getData = getData;
            mgr.exportCols = exportCols;
            // Optimally, this adds the skill to each of the columns.
            mgr.addSkill = addSkill;
            mgr.hasEmptySlot = hasEmptySlot;

            mgr.getSkills = getSkills;
            activate();
            return mgr;

            function activate () {
                var skills = mgr.getSkills(),
                    i;
            }

            function getSkills () {
                var result = [];
                mgr.eachColumn( function (col) {
                    result.concat(col.getSkills());
                });
                return result;
            }

            function addSkill (adding, position) {
                var mgr = this,
                    col = false;
                if (angular.isUndefined(position) || position == 1) {
                    mgr.cols.push(
                        new SkillColumn(adding)
                    );
                    return;
                }
                if (position > 1) {
                    col = mgr.firstResult(mgr.hasEmptySlot.bind(mgr, position))
                }
                if (col) {
                    col.add(adding);
                }
                mgr.sort();
            }
            function hasEmptySlot (position, column) {
                if (column.skills.length <= position) {
                    return;
                }
                return column;
            }

            function getTotalRanks() {
                var mgr = this,
                    idx = 0,
                    total = 0;
                for (idx = 0; idx < mgr.cols.length; idx++) {
                    total += mgr.cols[idx].getCost();
                }
                return total;
            }

            function getSkillTotals() {
                var mgr = this,
                    idx = 0,
                    totals = [];
                for (idx = 0; idx < mgr.cols.length; idx++) {
                    totals.push({total: mgr.cols[idx].getCost()});
                }
                return totals;
            }

            function getBonus(skill) {
                var mgr = this;
                return mgr.firstResult(mgr.getColumnBonus.bind(mgr, skill)) || 0;
            }

            function getColumnBonus(skill, column) {
                var mgr = this,
                    bonus = 0;
                if (!angular.isObject(column)) {
                    return;
                }
                bonus = column.getBonus(skill);
                if (column.isColumn && bonus > 0) {
                    return bonus;
                }
            }

            function firstResult(fn, context, after) {
                var mgr = this,
                    cols = mgr.cols,
                    idx = 0,
                    result = undefined;
                if (angular.isFunction(fn)) {
                    for (idx = 0; idx < cols.length; idx++) {
                        result = fn(cols[idx]);
                        if (result) {
                            return result;
                        }
                    }
                }
                return;
            }

            function sort() {
                var mgr = this;
                mgr.cols.sort(function (b, a) {
                    return a.getCost() - b.getCost();
                });
            }

            function rotate(byLevel) {
                var mgr = this,
                    col = 0,
                    level = 0,
                    result = [],
                    column = {},
                    row;
                if (mgr.cols.length < 1) {
                    console.warn('empty');
                    return;
                }
                //Rotate the columns representation for easier rendering
                for (level = 0; level < mgr.cols[0].skills.length; level++) {
                    for (col = 0; col < mgr.cols.length; col++) {
                        column = mgr.cols[col];
                        if (!result[level]) {
                            result.push([]);
                        }
                        row = result[level];
                        row.push(column.getByLevel(level));
                    }
                }
                if (angular.isUndefined(byLevel)) {
                    return result;
                }
                if (result.hasOwnProperty(byLevel)) {
                    return result[byLevel];
                } else {
                    row = [];
                    for (col = 0; col < mgr.cols.length; col++) {
                        row.push(mgr.cols[col].toSkillObj(''));
                    }
                    return row;
                }
            }

            function getTallestColumn() {
                var mgr = this,
                    cols = mgr.cols,
                    height = 0,
                    maxHeight = 0,
                    highestSoFar = -1,
                    idx = 0;
                mgr.sort();
                if (!mgr.cols) { return 0;}
                for (idx = 0; idx < cols.length; idx++) {
                    height = cols[idx].getHeight();
                    if (height > maxHeight) {
                        maxHeight = height;
                        highestSoFar = idx;
                    }
                }
                return cols[highestSoFar];
            }

            function getShortestColumn() {
                var mgr = this,
                    cols = mgr.cols,
                    height = 0,
                    maxHeight = 100,
                    lowestSoFar = 100,
                    idx = 0;
                for (idx = 0; idx < cols.length; idx++) {
                    height = cols[idx].getCost();
                    if (height < maxHeight) {
                        lowestSoFar = idx;
                    }
                }
                return cols[lowestSoFar];
            }

            function addNewColumn(column) {
                var mgr = this,
                    cols = mgr.cols;
                if (cols.indexOf(column) > -1) {
                    return;
                }
                if (angular.isObject(column) && column.isColumn) {
                    cols.push(column);
                } else {
                    cols.push(new SkillColumn());
                }
            }

            function eachColumn (action, context, arguments) {
                var mgr = this,
                    cols = mgr.cols,
                    idx = 0;
                for (idx = 0; idx < cols.length; idx++) {
                    action.apply(mgr || context, angular.isArray(arguments) ? (arguments).concat(cols[idx]) : [cols[idx]]);
                }
            }

            function searchForSkillByColumn(skill) {
                var mgr = this,
                    cols = mgr.cols,
                    result = [],
                    idx = 0;
                for (idx = 0; idx < cols.length; idx++) {
                    if (cols[idx].hasSkill(skill)) {
                        result.push(cols[idx]);
                    }
                }
                return result;
            }

            function isUniqueSkill(skill) {
                var mgr = this,
                    occurrences = mgr.searchForSkillByColumn(skill);
                if (occurrences.length > 1) {
                    return false;
                }
                if (occurrences.length == 1) {
                    return true;
                }
                return false; //Not sure if I need to return null.
            }

            function removeColumn(idx) {
                var mgr = this,
                    cols = mgr.cols;
                if (idx >= (cols.length - 1)) {
                    return;
                }
                mgr.cols = ([]).concat(cols.slice(0, idx), cols.slice(idx + 1));
            }

            function resetCols() {
                mgr.cols = [];
            }

            function importCols(data, type) {
                var mgr = this;
                switch (type) {
                    case 'text/csv':
                        return mgr.fromCsv(data);
                    case 'text/json':
                    case 'object':
                    default:
                        return mgr.fromJSON(data);
                }
            }

            function fromJSON(data) {
                var mgr = this,
                    idx = 0;
                if (angular.isArray(data) && angular.isArray(data[0])) {
                    mgr.resetCols();
                    for (idx = 0; idx < data.length; idx++) {
                        mgr.addNewColumn(new SkillColumn(data[idx]));
                    }
                }
            }

            function fromCsv(dataString) {
                var mgr = this,
                    cols = mgr.cols,
                    idx = 0,
                    lines = [],
                    csvArr = [],
                    line = '',
                    newCol = {},
                    csvLines = [],
                    columns = [];
                if (angular.isString(dataString)) {
                    mgr.resetCols();
                    if (dataString == '') { return; }
                    lines = dataString.split("\n");
                    for (idx = 0; idx < lines.length; idx++) {
                        line = lines[idx].replace(/,$/, "").trim();
                        if (line != '') {
                            csvArr = line.split(',');
                            for (var idx2 = 0; idx2 < csvArr.length; idx2++) {
                                csvArr[idx2] = csvArr[idx2].trim();
                            }
                            csvLines.push(csvArr);
                        }
                    }
                    columns = mgr._rotateArray(csvLines);
                    //Add columns;
                    for (idx = 0; idx < columns.length; idx++) {
                        newCol = new SkillColumn(columns[idx]);
                        mgr.addNewColumn(newCol);
                    }
                }
            }
            function _rotateArray (arr) {
                var result = [],
                    idx = 0,
                    idy = 0;
                if (!angular.isArray(arr)) {
                    console.warn('Not an array');
                    return[];
                }
                //First pass
                for (idx = 0; idx < arr.length; idx++) {
                    //Assemble column from reflection line.
                    for (idy = 0; idy < arr[idx].length; idy++) {
                        if (!angular.isArray(result[idy])) {
                            result[idy] = [];
                        }
                        result[idy].push(arr[idx][idy]);
                    }
                }
                result = result.map( function (col,i) {
                    return col.reverse();
                });
                return result;
            }

            function exportCols (type) {
                var result = '',
                    dataArray = [];
                switch(type) {
                    case 'text/csv':
                    default:
                        dataArray = _rotateArray( this.getData());
                        result = (dataArray.map(function(row,idx) {
                            return row.join(',');
                        })).reverse().join('\n');
                        return result;
                }
            }
            function getData () {
                var mgr = this,
                    result = [];
                mgr.cols.map(function (column,idx) {
                    result[idx] = [];
                    column.skills.map(function (skill,idy) {
                        result[idx][idy] = skill.skill;
                    });
                });
                return result;
            }
        }

        return SkillColumnManager;
    }
})();