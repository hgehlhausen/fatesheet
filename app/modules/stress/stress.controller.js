/**
 * Created by hgehlhausen on 1/25/16.
 * @author hgehlhausen
 */
(function () {

    angular.module('stress')
        .controller('stressCtrl', StressCtrl);
    StressCtrl.$inject = [ '$scope', 'SkillService', 'Stress', 'CharacterService'];
    function StressCtrl ($scope, SkillService, Stress, CharacterService) {
        //var boxes = Character.calculateStressBoxes();
        var stressTracks = this;
        $scope.mental = [{},{}];
        $scope.physical = [{},{}];
        activate ();
        return stressTracks;
        ////////////////////////////////////////////////////////
        function activate () {
            Stress.updateStressBoxes();
            $scope.mental = Stress.mental.boxes;
            $scope.physical = Stress.physical.boxes;
        }
    }
})();