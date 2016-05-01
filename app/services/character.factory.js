/**
 * Created by hgehlhausen on 1/25/16.
 * @author hgehlhausen
 */
( function () {
    console.log('loading Character');
    angular.module('services')
        .factory( 'CharacterService', CharacterService);
    CharacterService.$inject = ['$rootScope','Stress', 'SkillService', 'localStorageService'];
    function CharacterService  ($rootScope, Stress , SkillService, localStorageProvider) {
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
            var tmp = localStorageProvider.get(
                localStorageProvider.get('last_character')
                ),
                id = tmp.id;
            setTimeout( function () {
                load(tmp,id);
            },1);
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
                isCharacter : true,
                name   : charactersheet.name,
                description : charactersheet.description,
                skills : character.skills.exportCols(),
                stress : {
                    physical : charactersheet.physical,
                    mental   : charactersheet.mental,
                    hunger   : charactersheet.hunger
                },
                hungerActive : charactersheet.hungerActive,
                aspects : [
                    { type : 'highconcept' , value : charactersheet.highconcept },
                    { type : 'trouble',    value  : charactersheet.trouble} ,
                    { type : 'minor1',    value  : charactersheet.minor1} ,
                    { type : 'minor2',    value  : charactersheet.minor2} ,
                    { type : 'minor3',    value  : charactersheet.minor3}
                ]
            };
            console.log('format',format);
            localStorageProvider.set( character.id, format );
            localStorageProvider.set('last_character',character.id);
        }
        function load (charactersheet, id) {
            var tmp = character,
                skills = [];
            if (angular.isUndefined(id)) {
                tmp = localStorageProvider.get(
                    localStorageProvider.get('last_character')
                );
            } else {
                tmp = localStorageProvider.get(id);
            }
            if (tmp) {
                if (tmp.isCharacter) {
                    console.log('isCharacter!');
                }
                if (tmp.skills) {
                    console.log('skills assigning!');
                    character.skills.fromCsv(tmp.skills);
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
                if (tmp.aspects && tmp.aspects.length) {
                    character.aspects = {};
                    //Populate aspects
                    tmp.aspects.forEach(function (aspect) {
                        charactersheet[aspect.type] = aspect.value;
                    });
                }
                if (tmp.hungerActive) {
                    console.log('setting hunger active',tmp.hungerActive);
                    charactersheet.hungerActive = tmp.hungerActive;
                    character.hungerActive = tmp.hungerActive;
                }
                if (tmp.stress) {
                    charactersheet.hunger   = tmp.stress.hunger;
                    charactersheet.mental   = tmp.stress.mental;
                    charactersheet.physical = tmp.stress.physical;
                    character.hunger        = tmp.stress.hunger;
                    character.mental        = tmp.stress.mental;
                    character.physical      = tmp.stress.physical;
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