/**
 * Created by hgehlhausen on 1/29/16.
 * @author hgehlhausen
 */
(function () {
    angular.module('services')
        .factory('Stress', Stress);
    Stress.$inject = ['SkillService'];
    function Stress (Skills) {
        var service = {
            additionalBoxes : additionalBoxes,
            updateStressBoxes : updateStressBoxes,
            physical : {
                base : 2,
                total : 2,
                boxes : [{},{}]
            },
            mental : {
                total: 2,
                base : 2,
                boxes : [{},{}]
            }
        };

        return service;
        function updateStressBoxes () {
            var result = {
                    mental : [{},{}],
                    physical : [{},{}]
            },
                skills = Skills.getStressTrackSkills(),
                idx = 0;
            if (!angular.isObject(skills)) {
                return result;
            }
            if (skills.hasOwnProperty('will')) {
                for (idx = 0; idx < service.additionalBoxes(skills.will); idx++) {
                    result.mental.push({});
                }
                service.mental.boxes = result.mental;
            }
            if (skills.hasOwnProperty('physique')) {
                for (idx = 0; idx < service.additionalBoxes(skills.physique); idx++) {
                    result.physical.push({});
                }
                service.physical.boxes = result.physical;
            }
            return result;
        }
        function additionalBoxes (skillBonus) {
            return Math.ceil( skillBonus / 2);
        }
    }
})();