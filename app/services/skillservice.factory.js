/**
 * Created by hgehlhausen on 1/29/16.
 * @author hgehlhausen
 */
(function () {
    'use strict';
    SkillService.$inject = ['SkillColumn','SkillColumnManager'];
    angular.module('services')
        .factory('SkillService',SkillService);
    function SkillService (SkillColumn, SkillColumnManager) {
        var service = {
            mgr : new SkillColumnManager(),
            data : '',
            datatype : 'text/csv',
            generateRotated : generateRotated,
            getStressTrackSkills : getStressTrackSkills,
            getData : getData,
            setData : setData,
            exportCols : exportCols,
            fromCsv : fromCsv
        };
        return service;
        function generateRotated (rows) {
            var mgr = this.mgr,
                result = [],
                idx = 0,
                dynamicCol = {};
            if (angular.isUndefined(rows)) {
                dynamicCol = mgr.getTallestColumn();
                if (dynamicCol && dynamicCol.isColumn) {
                    rows = dynamicCol.getHeight();
                }
            }
            if (!angular.isNumber(rows)) {
                rows = 7;
            }
            mgr.sort();
            for (idx = 0; idx < rows; rows--) {
                result.push({arr : mgr.rotate(rows - 1)});
            }
            return result;
        }
        function getStressTrackSkills () {
            var mgr = this.mgr,
                skills = mgr.getSkills(),
                i;
            if (!mgr.trackSkills) {
                mgr.trackSkills = {
                    will : 0,
                    physique: 0
                };
            }
            for ( i = 0; i < skills.length; i++) {
                if (!mgr.trackSkills.hasOwnProperty(skills[i])) {
                    mgr.trackSkills[skills[i]] = mgr.getBonus(skills[i]);
                }
            }
            mgr.trackSkills.will = mgr.getBonus('will');
            mgr.trackSkills.physique = mgr.getBonus('physique');
            return mgr.trackSkills;
        }
        function getData () {
            var mgr = this.mgr,
                result = [];
            mgr.cols.map(function (column,idx) {
                result[idx] = [];
                column.skills.map(function (skill,idy) {
                    result[idx][idy] = skill.skill;
                });
            });
            return result;
        }
        function setData (data) {
            var mgr = this.mgr;
            if(angular.isUndefined(data)) { return; }
            if (!data) { return; }
            if (!angular.isArray(data)) {
                data = [data];
            }
            mgr.resetCols();

            data.map(function (column,idx) {
                mgr.addNewColumn(
                    new SkillColumn(column)
                );
            });
        }
        function exportCols (type) {
            return this.mgr.exportCols(type);
        }
        function fromCsv (csvData) {
            return this.mgr.fromCsv(csvData);
        }
    }

})();