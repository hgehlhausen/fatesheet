/**
 * Created by hgehlhausen on 4/19/16.
 * @author hgehlhausen
 * aspectmanager.factory for fatesheet
 */
(function () {
    angular.module('aspects')
        .factory('aspectmanager', aspectmanager);
    aspectmanager.$inject = ['$collection'];
    function aspectmanager ($collection) {
        var AspectManager = new $collection;
        return AspectManager;
    }
})();