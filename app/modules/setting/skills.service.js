/**
 * Created by hgehlhausen on 1/26/16.
 * @author hgehlhausen
 */
(function () {
    angular.module('campaignsetting')
        .factory('Skills', function () {
            var service = {};
            service.skills = [
                'will',
                'physique',
                'provoke',
                'scholarship',
                'empathy',
                'rapport',
                'contacts',
                'resources',
                'burglary',
                'investigation',
                'deceit',
                'athletics',
                'fight',
                'shoot',
                'stealth',
                'drive',
                'lore',
                'notice'
            ];
            return service;
        });
})();