export interface Options {
    keys: {
        keyJoiner: string;
        [key: string]: string;
    };
    customFields: {
        [key: string]: string;
    };
    customChildObj: {
        [key: string]: string;
    };
    prefix?: {
        [key: string]: string;
    };
    questVariables?: {
        prefix: string;
        suffix: string;
    };
    genderString?: boolean;
    snake_case?: boolean;
    unsetDefaultForm?: boolean;
    skipNormalIfUnset?: boolean;
    skipForms?: string[];
    includeProtos?: boolean;
    includeEstimatedPokemon?: boolean;
    minTrainerLevel?: number;
    placeholderData?: boolean;
    masterfileLocale?: string;
    manualTranslations?: boolean;
    mergeCategories?: boolean;
    processFormsSeparately?: boolean;
    includeRawForms?: boolean;
}
interface PokemonTemplate extends Form {
    pokedexId: boolean;
    pokemonName: boolean;
    form: Form;
    defaultFormId: boolean;
    genId: boolean;
    generation: boolean;
    fleeRate: boolean;
    captureRate: boolean;
    legendary: boolean;
    mythic: boolean;
    buddyGroupNumber: boolean;
    kmBuddyDistance: boolean;
    thirdMoveStardust: boolean;
    thirdMoveCandy: boolean;
    gymDefenderEligible: boolean;
}
interface Form extends BaseStats {
    formName: boolean;
    proto: boolean;
    formId: boolean;
    isCostume: boolean;
    evolutions: {
        evoId: boolean;
        formId: boolean;
        genderRequirement: boolean;
    };
    tempEvolutions: TempEvolution;
    quickMoves: Move;
    chargedMoves: Move;
    family: boolean;
    little: boolean;
}
declare type Move = {
    moveId: boolean;
    name: boolean;
    typeId: boolean;
    type: boolean;
};
interface TempEvolution extends BaseStats {
    tempEvoId: boolean;
    unreleased: boolean;
}
declare type BaseStats = {
    attack: boolean;
    defense: boolean;
    stamina: boolean;
    height: boolean;
    weight: boolean;
    types: {
        typeId: boolean;
        typeName: boolean;
    };
};
export interface TypesTempOpt {
    enabled: boolean;
    options: Options;
    template: TypesTemplate;
}
declare type TypesTemplate = {
    name: boolean;
};
declare type MoveTemplate = {
    id: boolean;
    name: boolean;
    proto: boolean;
    type: boolean;
    power: boolean;
};
declare type ItemTemplate = {
    id: boolean;
    name: boolean;
    proto: boolean;
    type: boolean;
    category: boolean;
    minTrainerLevel: boolean;
};
declare type QuestTemplate = {
    id: boolean;
    proto: boolean;
    formatted: boolean;
};
declare type InvasionTemplate = {
    id?: boolean;
    type?: boolean;
    gender?: boolean;
    grunt?: boolean;
    secondReward?: boolean;
    encounters?: boolean;
};
declare type WeatherTemplate = {
    weatherId: boolean;
    weatherName: boolean;
    proto: boolean;
    types: {
        typeId: boolean;
        typeName: boolean;
    };
};
declare type TranslationsTemplate = {
    pokemon: {
        names: boolean;
        forms: boolean;
        descriptions: boolean;
    };
    moves: boolean;
    items: boolean;
};
export interface Input {
    safe?: boolean;
    url?: string;
    template?: FullTemplate;
    test?: boolean;
    raw?: boolean;
}
export interface FullTemplate {
    pokemon?: {
        enabled: boolean;
        options: Options;
        template: PokemonTemplate;
    };
    types?: {
        enabled: boolean;
        options: Options;
        template: TypesTemplate;
    };
    moves?: {
        enabled: boolean;
        options: Options;
        template: MoveTemplate;
    };
    items?: {
        enabled: boolean;
        options: Options;
        template: ItemTemplate;
    };
    questConditions?: {
        enabled: boolean;
        options: Options;
        template: QuestTemplate;
    };
    questRewardTypes?: {
        enabled: boolean;
        options: Options;
        template: QuestTemplate;
    };
    invasions?: {
        enabled: boolean;
        options: Options;
        template: InvasionTemplate;
    };
    weather?: {
        enabled: boolean;
        options: Options;
        template: WeatherTemplate;
    };
    translations?: {
        enabled: boolean;
        options: Options;
        template: TranslationsTemplate;
        locales: {
            [code: string]: boolean;
        };
    };
}
export {};
