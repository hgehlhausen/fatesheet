/**
 * Created by hgehlhausen on 1/27/16.
 * @author hgehlhausen
 */
(function(){
    angular.module('skills')
        .controller('skills.skillslot',['$scope','$http','Skills','SkillColumn',skillslot]);
    function skillslot ($scope,$http,Skills, SkillColumn) {
        $scope.skills = Skills.skills;
        $scope.contains = contains;
        $scope.onClick = onClick;
        return this;
        function contains (skill) {
            return ($scope.skills.indexOf(skill) > -1);
        }
        function onClick (event) {
            console.log('click',arguments);
        }
        function onInputBlur (event) {
            console.log('onblur',arguments);
        }
        function onEmptyClick (column) {
            column.add('');

        }
    }
})();