const Model = (function () {
    
    class Hero {
        constructor(name, level) {
            this.name = name;
            this.level = level;
        }
    }
    
    class Warrior extends Hero {
        constructor(name, level, weapon) {
            super(name, level);
            this.weapon = weapon;
        }
    }

    class Mage extends Hero {
        constructor(name, level, spell) {
            super(name, level);
            this.spell = spell;
        }
    }

    const addHero = (name, level, weapon, hClass) => {
         let hero;
        if (hClass.value === 'mage') { 
            hero = new Mage (name.value, Number(level.value), weapon.value);
            data.mages.push(hero);
        } else {
            hero = new Warrior (name.value, Number(level.value), weapon.value);
            data.warriors.push(hero);
        }     
    }

    const data = {
        warriors: [],
        mages: []
    };
        
    return {
        data,
        addHero
    }

})();

const View = (function () {

    function displayWarrior(name, level, weapon, list) {

        const warriorElement = document.createElement('div');
        warriorElement.innerHTML = `<p>Name:${name}<span> Level:${level}</span> Weapon:${weapon}</p>`;     
        list.appendChild(warriorElement);
    } 

    function displayMage(name, level, spell, list) {

        const mageElement = document.createElement('div');
        mageElement.innerHTML = `<p>Name:${name}<span> Level:${level}</span> Spell:${spell}</p>`;
        list.appendChild(mageElement);
    }

    return { 
        displayWarrior,
        displayMage
    }

})();

const Controller = (function (Model, View) {

    const heroName = document.getElementById('heroName');
    const heroLevel = document.getElementById('heroLevel');
    const heroClass = document.getElementById('hero-class');
    const heroWeapon = document.getElementById('heroWeapon');

    const warriorList = document.getElementById('warriorList');
    const mageList = document.getElementById('mageList');

    const createCharacterBtn = document.getElementById('charCreate');
    const fightBtn = document.getElementById('fightBtn');

    createCharacterBtn.addEventListener('click', init);
    fightBtn.addEventListener('click', compareLvls);

    function init() {
        Model.addHero(heroName, heroLevel, heroWeapon, heroClass);
        init2()
    };


    function init2() {
        fightBtn.style.display = "inline-block"
        warriorList.innerHTML = '';
        mageList.innerHTML = '';
        for (let x of Model.data.warriors) {
            View.displayWarrior(x.name, x.level, x.weapon, warriorList);
        }
        for (let x of Model.data.mages) {
            View.displayMage(x.name, x.level, x.spell, mageList);
        }
    }

    function compareLvls() {
        let bestHeroArr=[];
        let bestHero;
        let champ;
                                                                        
        bestHeroArr.push(Math.max.apply(null, Model.data.warriors.map((o) => {return o.level})));
        bestHeroArr.push(Math.max.apply(null, Model.data.mages.map((o) => {return o.level})));

        if (bestHeroArr[0]>bestHeroArr[1]) {
            bestHero = bestHeroArr[0];
            champ = Model.data.warriors.find(function(o){return o.level == bestHero})
            return console.log(`${champ.name} used ${champ.weapon} and won!`);
        } else {
            bestHero = bestHeroArr[1];
            champ = Model.data.mages.find(function(o){return o.level == bestHero})
            return console.log(`${champ.name} used ${champ.spell} and won!`);
        }
    }

})(Model, View);


