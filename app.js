const Model = (() => {
  class Hero {
    constructor(id, name, level) {
      this.id = id;
      this.name = name;
      this.level = level;
    }
  }

  class Warrior extends Hero {
    constructor(id, name, level, weapon) {
      super(id, name, level);
      this.weapon = weapon;
    }
  }

  class Mage extends Hero {
    constructor(id, name, level, spell) {
      super(id, name, level);
      this.spell = spell;
    }
  }

  const addHero = (id, name, level, weapon, hClass) => {
    if (hClass.value === "mage") {
      data.mages.push(
        new Mage(id, name.value, Number(level.value), weapon.value)
      );
    } else {
      data.warriors.push(
        new Warrior(id, name.value, Number(level.value), weapon.value)
      );
    }
  };

  const compareLvls = () => {
    const allHeroArray = data.warriors.concat(data.mages);
    return allHeroArray.reduce((max, hero) =>
      max.level > hero.level ? max : hero
    );
  };

  const deleteItem = (e) => {
    e.preventDefault();
    b = data.warriors
      .concat(data.mages)
      .find((element) => element.id == e.currentTarget.parentElement.id);
    data.warriors.pop(b);
    data.mages.pop(b);
  };

  const uniqueID = () => {
    return Math.floor(Math.random() * Date.now());
  };

  const data = {
    warriors: [],
    mages: [],
  };

  return {
    data,
    addHero,
    uniqueID,
    compareLvls,
    deleteItem,
  };
})();

const View = (() => {
  const displayWarrior = (name, level, weapon, list, id) => {
    const warriorElement = document.createElement("p");
    warriorElement.setAttribute("id", id);
    warriorElement.innerHTML = `Name:${name} <span>Level:${level}</span> Weapon:${weapon} <button>delete</button>`;
    list.appendChild(warriorElement);
  };

  const displayMage = (name, level, spell, list, id) => {
    const mageElement = document.createElement("p");
    mageElement.setAttribute("id", id);
    mageElement.innerHTML = `Name:${name} <span>Level:${level}</span> Spell:${spell} <button>delete</button>`;
    list.appendChild(mageElement);
  };

  const displayWinner = (obj) => {
    const winnerDiv = document.getElementById(obj.id);
    winnerDiv.classList.add("winner");
  };

  return {
    displayWarrior,
    displayMage,
    displayWinner,
  };
})();

const Controller = ((Model, View) => {
  const heroName = document.getElementById("heroName");
  const heroLevel = document.getElementById("heroLevel");
  const heroClass = document.getElementById("hero-class");
  const heroWeapon = document.getElementById("heroWeapon");

  const warriorList = document.getElementById("warriorList");
  const mageList = document.getElementById("mageList");

  const createCharacterBtn = document.getElementById("charCreate");
  const fightBtn = document.getElementById("fightBtn");
  const deleteBtn = document.querySelectorAll(".deleteBtn");

  createCharacterBtn.addEventListener("click", init);

  fightBtn.addEventListener("click", () => {
    y = Model.compareLvls();
    View.displayWinner(y);
  });

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      Model.deleteItem(e);
      e.target.parentElement.remove();
    });
  });

  function init() {
    Model.addHero(Model.uniqueID(), heroName, heroLevel, heroWeapon, heroClass);
    init2();
  }

  function init2() {
    fightBtn.style.display = "inline-block";
    warriorList.innerHTML = "";
    mageList.innerHTML = "";
    for (let x of Model.data.warriors) {
      View.displayWarrior(x.name, x.level, x.weapon, warriorList, x.id);
    }
    for (let x of Model.data.mages) {
      View.displayMage(x.name, x.level, x.spell, mageList, x.id);
    }
  }
})(Model, View);
