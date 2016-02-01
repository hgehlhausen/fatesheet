/**
 * Created by hgehlhausen on 1/25/16.
 * @author hgehlhausen
 */
( function () {
    angular.module('skills')
        .controller('skills.skills',skills)
        .filter('reverse', function() {
            return function(items) {
                if (!angular.isArray(items)) {
                    console.warn('empty function supplied to reverse');
                    return [];
                }
                return items.slice().reverse();
            };
        });
    skills.$inject = ['$scope','$http','SkillService', 'Stress','CharacterService'];
    function skills( $scope,  $http, SkillService, Stress, Character) {
        $scope.columnMgr = Character.skills.mgr;
        $scope.skilldata = Character.skills.data;
        $scope.skilldatatype = Character.skills.datatype;
        $scope.totalRanks = Character.skills.mgr.getTotalRanks();
        $scope.skillTotals = Character.skills.mgr.getSkillTotals();
        $scope.onEditClick = onEditClick;

        $scope.onSkillClick = onSkillClick;
        $scope.onSkillSave = onSkillSave;
        //$scope.columnMgr.addSkill('freedom');
        //$scope.columnMgr.addSkill('slavery',3);
        activate();
        return this;
        function activate () {

            $scope.rotated = SkillService.generateRotated();
            $scope.totalRanks = SkillService.mgr.getTotalRanks();
            $scope.skillTotals = SkillService.mgr.getSkillTotals();
        }
        function onEditClick () {
            $scope.editSkills = !$scope.editSkills;
            if (!$scope.editSkills) {
                $scope.onSkillSave();
            } else {
                console.log()
            }
        };
        function onSkillSave () {
            $scope.columnMgr.importCols( $scope.skilldata, $scope.skilldatatype);
            $scope.rotated = SkillService.generateRotated();
            console.log({
                will : SkillService.mgr.getBonus('will'),
                physique : SkillService.mgr.getBonus('physique')
            });
            Stress.updateStressBoxes();
            $scope.skillTotals = Character.skills.mgr.getSkillTotals();
            $scope.totalRanks = Character.skills.mgr.getTotalRanks();
            console.log('Character:',Character);
            console.log('Stress:',Stress);
        };
        function onSkillClick (skillName) {
            alert( skillName + ' for a ' + $scope.columnMgr.getBonus(skillName))
        };
    }
})();