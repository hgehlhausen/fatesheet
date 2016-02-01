/**
 * Created by hgehlhausen on 1/27/16.
 * @author hgehlhausen
 */
(function () {
    angular.module('app')
        .directive('sheet',sheet);
    function sheet () {
        return {
            restrict : 'EA',
            templateUrl : 'app/modules/app/app.view.html',
            controller  : 'app.main'
        }
    }
})();