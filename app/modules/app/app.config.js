/**
 * Created by hgehlhausen on 1/28/16.
 * @author hgehlhausen
 */
(function(){
    'use strict';
    angular.module('app')
        .config( configure );

    configure.$inject = ['localStorageServiceProvider'];

    function configure (localStorageProvider) {
        localStorageProvider
            .setPrefix('fatesheet')
            .setStorageType('localStorage')
            //.setStorageCookie(45,'fatesheet')
            //.setStorageCookieDomain('')
            .setNotify(true,true); //@todo set this to false/false in production.
    }
})();