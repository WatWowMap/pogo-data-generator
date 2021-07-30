"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pogo_protos_1 = require("pogo-protos");
const Masterfile_1 = __importDefault(require("./Masterfile"));
const megas_json_1 = __importDefault(require("../data/megas.json"));
class Pokemon extends Masterfile_1.default {
    constructor(options) {
        super();
        this.options = options;
        this.formsToSkip = this.options.skipForms.map(name => name.toLowerCase());
        this.parsedPokemon = {};
        this.parsedForms = {
            0: {
                formName: '',
                proto: 'FORM_UNSET',
                formId: 0,
            },
        };
        this.formsRef = {};
        this.megaStats = {};
        this.evolvedPokemon = new Set();
        this.PokemonList = pogo_protos_1.Rpc.HoloPokemonId;
        this.FormsList = pogo_protos_1.Rpc.PokemonDisplayProto.Form;
        this.GenderList = pogo_protos_1.Rpc.PokemonDisplayProto.Gender;
        this.TempEvolutions = pogo_protos_1.Rpc.HoloTemporaryEvolutionId;
        this.FamilyId = pogo_protos_1.Rpc.HoloPokemonFamilyId;
        this.generations = {
            1: {
                name: 'Kanto',
                range: [1, 151],
            },
            2: {
                name: 'Johto',
                range: [152, 251],
            },
            3: {
                name: 'Hoenn',
                range: [252, 386],
            },
            4: {
                name: 'Sinnoh',
                range: [387, 494],
            },
            5: {
                name: 'Unova',
                range: [495, 649],
            },
            6: {
                name: 'Kalos',
                range: [650, 721],
            },
            7: {
                name: 'Alola',
                range: [722, 809],
            },
            8: {
                name: 'Galar',
                range: [810, 893],
            },
        };
        this.englishForms = {};
    }
    pokemonName(id) {
        switch (id) {
            case 29:
                return 'Nidoran♀';
            case 32:
                return 'Nidoran♂';
            default:
                return this.capitalize(this.PokemonList[id]);
        }
    }
    formName(id, formName) {
        const name = formName.substr(id === this.PokemonList.NIDORAN_FEMALE || id === this.PokemonList.NIDORAN_MALE
            ? 8
            : this.PokemonList[id].length + 1);
        return this.capitalize(name);
    }
    skipForms(formName) {
        return this.formsToSkip.some(form => formName.toLowerCase().includes(form));
    }
    lookupPokemon(name) {
        for (const key of Object.keys(this.PokemonList)) {
            if (name.startsWith(`${key}_`)) {
                return key;
            }
        }
    }
    getMoves(moves) {
        if (moves) {
            try {
                return moves.map(move => this.MovesList[move]);
            }
            catch (e) {
                console.error(e, '\n', moves);
            }
        }
    }
    compare(formData, parentData) {
        if (formData && parentData) {
            try {
                return formData.every((x, i) => x === parentData[i]);
            }
            catch (e) {
                console.error(e, '\nForm:', formData, '\nParent:', parentData);
            }
        }
    }
    getTypes(incomingTypes) {
        if (incomingTypes) {
            try {
                if (!incomingTypes[1]) {
                    incomingTypes.pop();
                }
                return incomingTypes.map(type => this.TypesList[type]);
            }
            catch (e) {
                console.error(e, '\n', incomingTypes);
            }
        }
    }
    compileEvos(mfObject) {
        const evolutions = [];
        mfObject.forEach(branch => {
            if (branch.temporaryEvolution) {
                return;
            }
            else if (branch.evolution) {
                const id = this.PokemonList[branch.evolution];
                evolutions.push({
                    evoId: id,
                    formId: this.FormsList[branch.form],
                    genderRequirement: this.options.genderString
                        ? this.genders[this.GenderList[branch.genderRequirement]]
                        : this.GenderList[branch.genderRequirement],
                });
                this.evolvedPokemon.add(id);
            }
        });
        return evolutions;
    }
    compileTempEvos(mfObject, primaryForm) {
        const tempEvolutions = mfObject.map(tempEvo => {
            const newTempEvolutions = {
                tempEvoId: this.TempEvolutions[tempEvo.tempEvoId],
            };
            switch (true) {
                case tempEvo.stats.baseAttack !== primaryForm.attack:
                case tempEvo.stats.baseDefense !== primaryForm.defense:
                case tempEvo.stats.baseStamina !== primaryForm.stamina:
                    newTempEvolutions.attack = tempEvo.stats.baseAttack;
                    newTempEvolutions.defense = tempEvo.stats.baseDefense;
                    newTempEvolutions.stamina = tempEvo.stats.baseStamina;
            }
            switch (true) {
                case tempEvo.averageHeightM !== primaryForm.height:
                case tempEvo.averageWeightKg !== primaryForm.weight:
                    newTempEvolutions.height = tempEvo.averageHeightM;
                    newTempEvolutions.weight = tempEvo.averageWeightKg;
            }
            const types = this.getTypes([tempEvo.typeOverride1, tempEvo.typeOverride2]);
            if (!this.compare(types, primaryForm.types)) {
                newTempEvolutions.types = types;
            }
            return newTempEvolutions;
        });
        return tempEvolutions;
    }
    generateProtoForms() {
        const FormArray = Object.keys(this.FormsList).map(i => i);
        for (let i = 0; i < FormArray.length; i++) {
            const proto = FormArray[i];
            try {
                const pokemon = proto.startsWith('NIDORAN_')
                    ? ['NIDORAN_FEMALE', 'NIDORAN_MALE']
                    : [this.formsRef[proto] || this.lookupPokemon(proto)];
                pokemon.forEach(pkmn => {
                    if (pkmn) {
                        const id = this.PokemonList[pkmn];
                        const formId = this.FormsList[proto];
                        const name = this.formName(id, proto);
                        this.englishForms[`form_${formId}`] = name;
                        if (!this.skipForms(name)) {
                            if (!this.parsedPokemon[id]) {
                                this.parsedPokemon[id] = {
                                    pokedexId: id,
                                    pokemonName: this.pokemonName(id),
                                };
                            }
                            if (!this.parsedPokemon[id].forms) {
                                this.parsedPokemon[id].forms = [];
                            }
                            if (this.parsedPokemon[id].defaultFormId === undefined) {
                                this.parsedPokemon[id].defaultFormId = 0;
                            }
                            if (this.parsedPokemon[id].defaultFormId === 0 && name === 'Normal') {
                                if (!this.options.unsetDefaultForm) {
                                    this.parsedPokemon[id].defaultFormId = formId;
                                }
                                if (this.options.skipNormalIfUnset) {
                                    return;
                                }
                            }
                            if (!this.parsedForms[formId]) {
                                this.parsedForms[formId] = {
                                    formName: name,
                                    proto,
                                    formId,
                                };
                            }
                            if (!this.parsedPokemon[id].forms.includes(formId)) {
                                this.parsedPokemon[id].forms.push(formId);
                            }
                        }
                    }
                });
            }
            catch (e) {
                console.error(e, '\n', proto);
            }
        }
    }
    addForm(object) {
        if (object.templateId.split('_')[1]) {
            const id = Number(object.templateId.split('_')[1].slice(1));
            try {
                const forms = object.data.formSettings.forms;
                if (forms) {
                    if (!this.parsedPokemon[id]) {
                        this.parsedPokemon[id] = {};
                    }
                    if (!this.parsedPokemon[id].forms) {
                        this.parsedPokemon[id].forms = [];
                    }
                    for (let i = 0; i < forms.length; i++) {
                        const formId = this.FormsList[forms[i].form];
                        this.formsRef[forms[i].form] = object.data.formSettings.pokemon;
                        const name = this.formName(id, forms[i].form);
                        if (i === 0) {
                            this.parsedPokemon[id].defaultFormId = formId;
                        }
                        if (!this.skipForms(name)) {
                            this.parsedForms[formId] = {
                                formName: name,
                                proto: forms[i].form,
                                formId,
                                isCostume: forms[i].isCostume,
                            };
                        }
                    }
                }
                else {
                    if (this.parsedPokemon[id]) {
                        this.parsedPokemon[id].defaultFormId = 0;
                        this.parsedPokemon[id].forms.push(0);
                    }
                    else {
                        this.parsedPokemon[id] = {
                            pokedexId: id,
                            pokemonName: this.pokemonName(id),
                            defaultFormId: 0,
                            forms: [0],
                        };
                    }
                }
            }
            catch (e) {
                console.error(e, '\n', object);
            }
        }
    }
    addPokemon(object) {
        const { templateId, data: { pokemonSettings }, } = object;
        const split = templateId.split('_');
        const id = Number(split[0].slice(1));
        if (!this.parsedPokemon[id]) {
            this.parsedPokemon[id] = {};
        }
        const formId = /^V\d{4}_POKEMON_/.test(templateId)
            ? this.FormsList[templateId.substr('V9999_POKEMON_'.length)]
            : null;
        if (formId) {
            if (!this.parsedPokemon[id].forms) {
                this.parsedPokemon[id].forms = [];
            }
            const primaryForm = this.parsedPokemon[id];
            const formName = split.filter((word, i) => i > 1 && word).join('_');
            if (!this.skipForms(formName)) {
                if (!this.parsedForms[formId]) {
                    this.parsedForms[formId] = {
                        formName,
                        proto: templateId,
                        formId,
                    };
                }
                if (!this.parsedPokemon[id].forms.includes(formId)) {
                    this.parsedPokemon[id].forms.push(formId);
                }
                const form = this.parsedForms[formId];
                switch (true) {
                    case pokemonSettings.stats.baseAttack !== primaryForm.attack:
                    case pokemonSettings.stats.baseDefense !== primaryForm.defense:
                    case pokemonSettings.stats.baseStamina !== primaryForm.stamina:
                        form.attack = pokemonSettings.stats.baseAttack;
                        form.defense = pokemonSettings.stats.baseDefense;
                        form.stamina = pokemonSettings.stats.baseStamina;
                }
                switch (true) {
                    case object.data.pokemonSettings.pokedexHeightM !== primaryForm.height:
                    case object.data.pokemonSettings.pokedexWeightKg !== primaryForm.weight:
                        form.height = object.data.pokemonSettings.pokedexHeightM;
                        form.weight = object.data.pokemonSettings.pokedexWeightKg;
                }
                const qMoves = this.getMoves(pokemonSettings.quickMoves);
                if (!this.compare(qMoves, primaryForm.quickMoves)) {
                    form.quickMoves = qMoves;
                }
                const cMoves = this.getMoves(pokemonSettings.cinematicMoves);
                if (!this.compare(cMoves, primaryForm.chargedMoves)) {
                    form.chargedMoves = cMoves;
                }
                const types = this.getTypes([pokemonSettings.type, pokemonSettings.type2]);
                if (!this.compare(types, primaryForm.types)) {
                    form.types = types;
                }
                const family = this.FamilyId[pokemonSettings.familyId];
                if (family !== primaryForm.family) {
                    form.family = family;
                }
                if (pokemonSettings.evolutionBranch && pokemonSettings.evolutionBranch.some(evo => evo.evolution)) {
                    form.evolutions = this.compileEvos(pokemonSettings.evolutionBranch);
                }
                if ((form.formName === 'Normal' || form.formName === 'Purified') && primaryForm.tempEvolutions) {
                    form.tempEvolutions = [];
                    Object.values(primaryForm.tempEvolutions).forEach(tempEvo => {
                        form.tempEvolutions.push(tempEvo);
                    });
                }
            }
        }
        else {
            this.parsedPokemon[id] = Object.assign(Object.assign({ pokedexId: id, pokemonName: this.pokemonName(id), forms: this.parsedPokemon[id].forms || [] }, this.parsedPokemon[id]), { types: this.getTypes([pokemonSettings.type, pokemonSettings.type2]), attack: pokemonSettings.stats.baseAttack, defense: pokemonSettings.stats.baseDefense, stamina: pokemonSettings.stats.baseStamina, height: pokemonSettings.pokedexHeightM, weight: pokemonSettings.pokedexWeightKg, quickMoves: this.getMoves(pokemonSettings.quickMoves), chargedMoves: this.getMoves(pokemonSettings.cinematicMoves), family: this.FamilyId[pokemonSettings.familyId], fleeRate: pokemonSettings.encounter.baseFleeRate, captureRate: pokemonSettings.encounter.baseCaptureRate, legendary: pokemonSettings.rarity === 'POKEMON_RARITY_LEGENDARY', mythic: pokemonSettings.rarity === 'POKEMON_RARITY_MYTHIC', buddyGroupNumber: pokemonSettings.buddyGroupNumber, kmBuddyDistance: pokemonSettings.kmBuddyDistance, thirdMoveStardust: pokemonSettings.thirdMove.stardustToUnlock, thirdMoveCandy: pokemonSettings.thirdMove.candyToUnlock, gymDefenderEligible: pokemonSettings.isDeployable, genId: +Object.keys(this.generations).find(gen => {
                    return id >= this.generations[gen].range[0] && id <= this.generations[gen].range[1];
                }) });
            if (pokemonSettings.evolutionBranch && pokemonSettings.evolutionBranch.some(evo => evo.evolution)) {
                this.parsedPokemon[id].evolutions = this.compileEvos(pokemonSettings.evolutionBranch);
            }
            if (pokemonSettings.tempEvoOverrides) {
                this.parsedPokemon[id].tempEvolutions = this.compileTempEvos(pokemonSettings.tempEvoOverrides, this.parsedPokemon[id]);
            }
            this.parsedPokemon[id].generation = this.generations[this.parsedPokemon[id].genId].name;
        }
    }
    megaInfo() {
        const megaLookup = {
            undefined: this.TempEvolutions.TEMP_EVOLUTION_MEGA,
            _X: this.TempEvolutions.TEMP_EVOLUTION_MEGA_X,
            _Y: this.TempEvolutions.TEMP_EVOLUTION_MEGA_Y,
        };
        for (const { data } of megas_json_1.default.items) {
            const match = /^V(\d{4})_POKEMON_.*_MEGA(_[XY])?$/.exec(data.templateId);
            const pokemonId = parseInt(match[1]);
            if (!this.megaStats[pokemonId]) {
                this.megaStats[pokemonId] = [];
            }
            this.megaStats[pokemonId].push({
                tempEvoId: megaLookup[match[2]],
                attack: data.pokemon.stats.baseAttack,
                defense: data.pokemon.stats.baseDefense,
                stamina: data.pokemon.stats.baseStamina,
                type1: data.pokemon.type1,
                type2: data.pokemon.type2,
            });
        }
    }
    futureMegas() {
        Object.values(this.PokemonList).forEach((id) => {
            const guessedMega = this.megaStats[id];
            if (guessedMega) {
                if (!this.parsedPokemon[id]) {
                    this.parsedPokemon[id] = { pokemonName: this.pokemonName(id) };
                }
                if (!this.parsedPokemon[id].tempEvolutions) {
                    this.parsedPokemon[id].tempEvolutions = [];
                }
                for (const { tempEvoId, attack, defense, stamina, type1, type2 } of guessedMega) {
                    if (!this.parsedPokemon[id].tempEvolutions.some(evo => evo.tempEvoId === tempEvoId)) {
                        const types = this.getTypes([type1, type2]);
                        const evo = {
                            tempEvoId,
                            attack,
                            defense,
                            stamina,
                            unreleased: true,
                        };
                        if (!this.compare(types, this.parsedPokemon[id].types)) {
                            evo.types = types;
                        }
                        this.parsedPokemon[id].tempEvolutions.push(evo);
                    }
                }
            }
        });
    }
    littleCup() {
        if (this.lcBanList === undefined) {
            console.warn('Missing little cup ban list from Masterfile');
        }
        else {
            this.lcBanList.add('FARFETCHD');
            this.parsedForms[this.FormsList.FARFETCHD_GALARIAN].little = true;
        }
        for (const [id, pokemon] of Object.entries(this.parsedPokemon)) {
            const allowed = id == this.PokemonList.DEERLING ||
                (!this.evolvedPokemon.has(parseInt(id)) && pokemon.evolutions !== undefined);
            if (allowed) {
                pokemon.little = true;
            }
        }
    }
}
exports.default = Pokemon;
