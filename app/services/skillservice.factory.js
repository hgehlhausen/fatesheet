/**
 * Created by hgehlhausen on 1/29/16.
 * @author hgehlhausen
 */
(function () {
    'use strict';
    angular.module('services')
        .factory('SkillService',SkillService);
    SkillService.$inject = ['SkillColumn','SkillColumnManager'];
    function SkillService (SkillColumn, SkillColumnManager) {
        var service = {
            mgr : new SkillColumnManager(),
            data : '',
            datatype : 'text/csv',
            generateRotated : generateRotated,
            getStressTrackSkills : getStressTrackSkills
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
            var mgr = this.mgr;
            return {
                will : mgr.getBonus('will'),
                physique : mgr.getBonus('physique')
            };
        }
    }

})();