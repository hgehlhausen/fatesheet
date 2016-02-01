/**
 * Created by hgehlhausen on 1/25/16.
 * @author hgehlhausen
 */
( function () {
    console.log('loading Character');
    angular.module('services')
        .factory( 'CharacterService', CharacterService);
    CharacterService.$inject = ['Stress', 'SkillService'];
    function CharacterService (Stress, SkillService) {
        var character = {};
        character.name = '';
        character.skills = SkillService; // Assigned later by the skills module
        activate();
        return character;
        function activate() {
            //character.updateSkillsAndStress();
        }
        //function updateSkillsAndStress () {
        //    character.stressTrack = Stress.updateStressBoxes(character.skills.getStressTrackSkills());
        //}
    }
})();