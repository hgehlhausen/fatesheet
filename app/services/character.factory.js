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
            isCharacter : true,
            name : '',
            description : '',
            skills : SkillService,
            save : save,
            load : load,
            erase : erase
        };

        activate();
        return character;
        function activate() {
            //@todo try to load
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
        function save (charactersheet) {
            var format = {
                name   : charactersheet.name,
                description : charactersheet.description,
                skills : character.skills.getData(),
                aspects : {
                    highconcept : charactersheet.highconcept,
                    trouble     : charactersheet.trouble,
                    minor1      : charactersheet.minor1,
                    minor2      : charactersheet.minor2,
                    minor3      : charactersheet.minor3
                }
            };
            console.log('format',format);
            localStorageProvider.set( character.id, format );
            localStorageProvider.set('last_character',character.id);
        }
        function load (charactersheet, id) {
            console.log('character.load');
            var tmp = character,
                skills = [];
            if (angular.isUndefined(id)) {
                tmp = localStorageProvider.get(
                    localStorageProvider.get('last_character')
                );
            } else {
                console.log('id provided');
                tmp = localStorageProvider.get(id);
            }
            if (tmp) {
                if (tmp.isCharacter) {
                    console.log('isCharacter!');
                }
                if (tmp.skills) {
                    console.log('skills assigning!');
                    character.skills.setData(tmp.skills);
                    console.log('skills assigned');
                }
                if (tmp.name) {
                    character.name = tmp.name;
                    charactersheet.name = tmp.name;
                }
                if (tmp.description) {
                    character.description = tmp.description;
                    charactersheet.description = tmp.description;
                }
                if (tmp.aspects) {
                    character.aspects = tmp.aspects;
                    //Populate aspects
                    for (var aspect in tmp.aspects) {
                        //console.log('aspect:')
                        charactersheet[aspect] = tmp.aspects[aspect];
                    }
                }
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