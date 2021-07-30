import { AllPokemon, TempEvolutions, Evolutions, SinglePokemon, AllForms } from '../typings/dataTypes';
import { NiaMfObj, Generation, TempEvo, EvoBranch, MegaStats } from '../typings/general';
import Masterfile from './Masterfile';
import { Options } from '../typings/inputs';
export default class Pokemon extends Masterfile {
    parsedPokemon: AllPokemon;
    parsedForms: AllForms;
    formsRef: {
        [id: string]: string;
    };
    FormsList: any;
    PokemonList: any;
    GenderList: any;
    TempEvolutions: any;
    FamilyId: any;
    generations: Generation;
    megaStats: MegaStats;
    lcBanList: any;
    evolvedPokemon: any;
    options: Options;
    formsToSkip: string[];
    englishForms: {
        [id: string]: string;
    };
    constructor(options: Options);
    pokemonName(id: number): string;
    formName(id: number, formName: string): string;
    skipForms(formName: string): boolean;
    lookupPokemon(name: string): string;
    getMoves(moves: string[]): any[];
    compare(formData: number[], parentData: number[]): boolean;
    getTypes(incomingTypes: string[]): any[];
    compileEvos(mfObject: EvoBranch[]): Evolutions[];
    compileTempEvos(mfObject: TempEvo[], primaryForm: SinglePokemon): TempEvolutions[];
    generateProtoForms(): void;
    addForm(object: NiaMfObj): void;
    addPokemon(object: NiaMfObj): void;
    megaInfo(): void;
    futureMegas(): void;
    littleCup(): void;
}
