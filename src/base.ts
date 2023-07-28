import { FullTemplate } from './typings/inputs'

const baseTemplate: FullTemplate = {
  globalOptions: {
    keyJoiner: '_',
    customChildObj: {},
    customFields: {},
    genderString: false,
    snake_case: true,
    includeProtos: true,
  },
  pokemon: {
    enabled: true,
    options: {
      topLevelName: 'pokemon',
      keys: {
        main: 'pokedexId',
        forms: 'formId',
        evolutions: false,
        tempEvolutions: 'tempEvoId',
        types: false,
        quickMoves: false,
        chargedMoves: false,
        questRequirement: false,
        costumeOverrideEvos: false,
      },
      customFields: {
        evoId: 'pokemon',
        formId: 'form',
        formName: 'name',
        pokemonName: 'name',
      },
      makeSingular: {
        itemRequirement: false,
        questRequirement: false,
      },
      unsetDefaultForm: false,
      includeUnset: false,
      skipNormalIfUnset: false,
      skipForms: [],
      noFormPlaceholders: false,
      includeEstimatedPokemon: {
        baseStats: true,
        mega: true,
        gmax: false,
      },
      processFormsSeparately: false,
      includeRawForms: false,
    },
    template: {
      pokedexId: true,
      pokemonName: true,
      formId: false,
      forms: {
        formId: false,
        formName: true,
        proto: true,
        isCostume: true,
        evolutions: {
          evoId: true,
          formId: true,
          genderRequirement: true,
          candyCost: false,
          itemRequirement: false,
          tradeBonus: false,
          questRequirement: false,
        },
        tempEvolutions: {},
        attack: true,
        defense: true,
        stamina: true,
        height: true,
        weight: true,
        types: 'typeName',
        quickMoves: 'moveName',
        chargedMoves: 'moveName',
        family: true,
        little: true,
        purificationCandy: false,
        purificationDust: false,
        tradable: false,
        transferable: false,
        bonusCandyCapture: false,
        bonusStardustCapture: false,
        costumeOverrideEvos: {
          costumeId: true,
          costumeProto: true,
          costumeName: true,
        },
      },
      defaultFormId: true,
      genId: true,
      generation: true,
      types: 'typeName',
      quickMoves: 'moveName',
      chargedMoves: 'moveName',
      attack: true,
      defense: true,
      stamina: true,
      height: true,
      weight: true,
      fleeRate: true,
      captureRate: true,
      tempEvolutions: {
        tempEvoId: false,
        attack: true,
        defense: true,
        stamina: true,
        height: true,
        weight: true,
        types: 'typeName',
        unreleased: true,
        firstEnergyCost: false,
        subsequentEnergyCost: false,
      },
      costumeOverrideEvos: 'costumeId',
      evolutions: {
        evoId: true,
        formId: true,
        genderRequirement: true,
        candyCost: false,
        itemRequirement: false,
        tradeBonus: false,
        questRequirement: false,
      },
      legendary: true,
      mythic: true,
      buddyGroupNumber: true,
      buddyDistance: true,
      buddyMegaEnergy: false,
      thirdMoveStardust: true,
      thirdMoveCandy: true,
      gymDefenderEligible: true,
      tradable: false,
      transferable: false,
      family: true,
      little: true,
      jungle: false,
      unreleased: false,
      bonusCandyCapture: false,
      bonusStardustCapture: false,
    },
  },
  costumes: {
    enabled: false,
    options: {
      keys: {
        main: 'id',
      },
    },
    template: {
      id: true,
      name: true,
      proto: true,
      noEvolve: true,
    },
  },
  types: {
    enabled: true,
    options: {
      topLevelName: 'types',
      keys: {
        main: 'typeId',
      },
    },
    template: 'typeName',
  },
  moves: {
    enabled: true,
    options: {
      topLevelName: 'moves',
      keys: {
        main: 'moveId',
        type: false,
      },
      customFields: {
        moveId: 'id',
        moveName: 'name',
      },
    },
    template: {
      moveId: true,
      moveName: true,
      proto: true,
      type: 'typeName',
      power: true,
    },
  },
  items: {
    enabled: true,
    options: {
      topLevelName: 'items',
      keys: {
        main: 'itemId',
      },
      customFields: {
        itemId: 'id',
        itemName: 'name',
      },
      snake_case: false,
      minTrainerLevel: 50,
    },
    template: {
      itemId: false,
      itemName: true,
      proto: true,
      type: true,
      category: true,
      minTrainerLevel: true,
    },
  },
  questTypes: {
    enabled: true,
    options: {
      topLevelName: 'questTypes',
      keys: {
        main: 'id',
      },
    },
    template: {
      id: false,
      proto: true,
      formatted: true,
    },
  },
  questConditions: {
    enabled: true,
    options: {
      topLevelName: 'questConditions',
      keys: {
        main: 'id',
      },
    },
    template: {
      id: false,
      proto: true,
      formatted: true,
    },
  },
  questRewardTypes: {
    enabled: true,
    options: {
      topLevelName: 'questRewardTypes',
      keys: {
        main: 'id',
      },
    },
    template: {
      id: false,
      proto: true,
      formatted: true,
    },
  },
  invasions: {
    enabled: true,
    options: {
      topLevelName: 'invasions',
      keys: {
        main: 'id',
        encounters: 'position',
      },
      includeBalloons: true,
      customFields: {
        first: 'first',
        second: 'second',
        third: 'third',
      },
      placeholderData: true,
    },
    template: {
      active: true,
      id: false,
      type: true,
      gender: true,
      grunt: true,
      firstReward: true,
      secondReward: true,
      thirdReward: true,
      encounters: 'id',
    },
  },
  weather: {
    enabled: true,
    options: {
      topLevelName: 'weather',
      keys: {
        main: 'weatherId',
      },
      customFields: {
        weatherName: 'name',
      },
    },
    template: {
      weatherId: false,
      weatherName: true,
      proto: false,
      types: 'typeName',
    },
  },
  raids: {
    enabled: false,
    options: {
      keys: {
        main: 'id',
      }
    },
    template: 'formatted'
  },
  teams: {
    enabled: false,
    options: {
      keys: {
        main: 'id',
      }
    },
    template: 'formatted'
  },
  routeTypes: {
    enabled: false,
    options: {
      keys: {
        main: 'id',
      }
    },
    template: 'formatted'
  },
  translations: {
    enabled: true,
    options: {
      topLevelName: 'translations',
      prefix: {
        pokemon: 'poke_',
        forms: 'form_',
        costumes: 'costume_',
        alignment: 'alignment_',
        evolutions: 'evo_',
        descriptions: 'desc_',
        moves: 'move_',
        items: 'item_',
        weather: 'weather_',
        types: 'poke_type_',
        grunts: 'grunt_',
        gruntsAlt: 'grunt_a_',
        characterCategories: 'character_category_',
        lures: 'lure_',
        throwTypes: 'throw_type_',
        pokemonCategories: 'pokemon_categories_',
        questTypes: 'quest_',
        questConditions: 'quest_condition_',
        questRewardTypes: 'quest_reward_',
        questTitles: 'quest_title_',
        raidLevel: 'raid_',
        eggLevel: 'egg_',
      },
      questVariables: {
        prefix: '{{',
        suffix: '}}',
      },
      questTitleTermsToSkip: [
        'gofest',
        'gotour',
        'dialog',
        'title',
        'summer_return',
        '_complete_',
        'location',
        'vote',
      ],
      masterfileLocale: false,
      manualTranslations: true,
      mergeCategories: true,
      useLanguageAsRef: false,
    },
    locales: {
      de: true,
      en: true,
      es: false,
      fr: true,
      hi: false,
      id: false,
      it: false,
      ja: false,
      ko: false,
      'pt-br': false,
      ru: false,
      th: false,
      'zh-tw': false,
      tr: false,
    },
    template: {
      pokemon: {
        names: true,
        forms: true,
        descriptions: true,
      },
      moves: true,
      items: true,
      types: true,
      characters: true,
      weather: true,
      misc: true,
      pokemonCategories: true,
      quests: true,
    },
  },
}

export default baseTemplate
