/**
 * Created by hgehlhausen on 1/27/16.
 * @author hgehlhausen
 */
(function () {
    console.log('loading services');
    angular.module('services')
        .factory('SkillColumn', function () {
            function SkillColumn(skills) {
                var col = this;
                col.isColumn = true;
                col.skills = [];
                col.hasSkill = hasSkill;
                col.indexOfSkill = indexOfSkill;
                col.getBonus = getBonus;
                col.getCost = getCost;
                col.getHeight = getHeight;
                col.getByLevel = getByLevel;
                col.remove = remove;
                col.add = add;
                col.move = move;
                col.findOccurrences = findOccurrences;
                col.isUniqueSkill = isUniqueSkill;
                col.toSkillObj = toSkillObj;
                col.toString = toString;
                col.reset = reset;
                //Load Skills if Provided
                if (angular.isArray(skills)) {
                    for (var i = 0; i < skills.length; i++) {
                        !col.add(skills[i])
                    }
                }

                return col;
                ////////////////////////////////////////////////////////////
                function getCost() {
                    var x = this.skills.length;
                    return ( x * ( x + 1 ) ) / 2;
                }
                function add (skill, position) {
                    var col = this;
                    if (angular.isUndefined(skill)) {
                        console.warn('cannot add empty skill');
                        return true;
                    }
                    if (!angular.isString(skill) && (!angular.isObject(skill) || !skill.hasOwnProperty('skill'))) {
                        console.warn('param skill must be {String} or {Object} with skill property');
                        return true;
                    }
                    if (col.hasSkill(skill)) {
                        return false;
                    }
                    if (angular.isUndefined(position)) {
                        col.skills.push( col.toSkillObj(skill) );
                        return true;
                    }
                    if (!angular.isNumber(position)) {
                        console.warn('param position must be {Number}');
                        return true;
                    }
                    col.skills = col.skills.slice(0, position).concat([{ skill : skill}], col.skills.slice(position));
                    return true;
                }
                function remove (skill) {
                    var col = this,
                        idx = col.indexOfSkill(skill);
                    if (idx > -1) {
                        this.skills = ([]).concat(
                            this.skills.slice(0, idx),
                            this.skills.slice(idx + 1)
                        );
                        return true;
                    }
                    return false;
                }
                function move (skill, toPos) {
                    var col = this,
                        idx = col.indexOfSkill(skill);
                    if (!angular.isNumber(toPos) || toPos < 0 || toPos > (col.skills.length -1)) {return;}
                    if (idx > -1) {
                        col.remove(skill);
                        col.add(skill,toPos);
                    }
                }
                function getBonus (skill) {
                    if (!angular.isString(skill)) {
                        return 0;
                    }
                    var idx = this.indexOfSkill(skill);
                    if (angular.isNumber(idx)) {
                        return idx + 1;
                    }
                    return 0;
                }
                function getByLevel (level) {
                    if (!angular.isNumber(level)) {return;}
                    if (level < col.skills.length && level >= 0) {
                        return col.skills[level]
                    } else {
                        return col.toSkillObj('');
                    }
                }
                function hasSkill (skill) {
                    var col = this,
                        res = col.indexOfSkill(skill);
                    return (res > -1);
                }
                function findOccurrences (skill) {
                    var col = this,
                        skills = col.skills,
                        idx = 0,
                        test = angular.isObject(skill) ? skill.skill : skill,
                        results = [];
                    for ( idx = 0; idx < skills.length; i++) {
                        if (skills[idx].skill = test) {
                            results.push(skills[idx]);
                        }
                    }
                    return results;
                }
                function isUniqueSkill (skill) {
                    var col = this,
                        res = col.findOccurrences(skill);
                    return (res.length > 0 && res.length < 2);
                }
                function indexOfSkill (skill) {
                    var col = this,
                        skills = col.skills,
                        result = -1,
                        test = angular.isObject(skill) ? skill.skill : skill,
                        i = 0,
                        skillObj = {};
                    for (i = 0; i< skills.length; i++) {
                        skillObj = skills[i];
                        if (skillObj.skill == test) {
                            return i;
                        }
                    }
                    return result;
                }
                function toSkillObj (skill) {
                    var col = this;
                    if (angular.isString(skill)) {
                        return { skill : skill, column : col, toString : toString};
                    }
                    if (angular.isObject(skill) && angular.hasOwnProperty('skill')) {
                        skill.column = col;
                        skill.toString = toString;
                        return skill;
                    }
                    function toString () {
                        return this.skill;
                    }
                }
                function toString () {
                    return this.skills.join('<br>\r\n');
                }
                function getHeight () {
                    if (this.skills) {
                        return this.skills.length;
                    } else {
                        return 0;
                    }
                }
                function reset () {
                    this.skills = [];
                }
            }

            return SkillColumn;
        });
})();