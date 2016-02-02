/**
 * Created by hgehlhausen on 2/1/16.
 * @author hgehlhausen
 * app.run for fatesheet
 */
(function () {
    angular.module('app')
        .run(runApp);
    function runApp () {
        console.log('run complete!',console.log(arguments));
    }
})();