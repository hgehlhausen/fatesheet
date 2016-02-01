/**
 * Created by hgehlhausen on 1/27/16.
 * @author hgehlhausen
 */
(function (){
    console.log('main controller load');
    angular.module('app')
        .controller('app.main', ['$scope','$http', main]);
    function main ($scope,$http) {

    }
})();