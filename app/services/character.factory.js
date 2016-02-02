/**
 * Created by hgehlhausen on 1/25/16.
 * @author hgehlhausen
 */
( function () {
    console.log('loading Character');
    angular.module('services')
        .factory( 'CharacterService', CharacterService);
    CharacterService.$inject = ['Stress', 'SkillService', 'localStorageService'];
    function CharacterService  ( Stress , SkillService, localStorageProvider) {
        var character = {
            id : generateId(),
            save : save,
            load : load,
            erase : erase
        };
        character.name = '';
        character.skills = SkillService; // Assigned later by the skills module
        activate();
        return character;
        function activate() {
            //character.updateSkillsAndStress();
        }
        function generateId () {
            var character = this;
            if (!character.id) {
                return hashCode((new Date).toString());
            } else {
              return character.id;
            }
        }
        function hashCode (str) {
            var hash = 0, i, chr, len;
            if (str.length === 0) return hash;
            for (i = 0, len = this.length; i < len; i++) {
                chr   = str.charCodeAt(i);
                hash  = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }
        function save () {
            localStorageProvider.set( character.id, character );
        }
        function load (id) {
            if (angular.isUndefined(id)) {
                character = localStorageProvider.get('lastCharacter');
            } else {
                character = localStorageProvider.get(id);
            }
        }
        function erase (id) {
            if (angular.isUndefined(id)) {
                localStorageProvider.removeItem(this.id);
            } else {
                localStorage.removeItem(id);
            }
        }
    }
})();