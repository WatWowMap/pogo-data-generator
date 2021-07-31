import { Rpc } from 'pogo-protos'

export type WeatherProto = keyof typeof Rpc.GameplayWeatherProto.WeatherCondition

export type TypeProto = keyof typeof Rpc.HoloPokemonType

export type PokemonIdProto = keyof typeof Rpc.HoloPokemonId

export type MoveProto = keyof typeof Rpc.HoloPokemonMove

export type FormProto = keyof typeof Rpc.PokemonDisplayProto.Form

export type GenderProto = keyof typeof Rpc.PokemonDisplayProto.Gender

export type FamilyProto = keyof typeof Rpc.HoloPokemonFamilyId

export type MegaProto = keyof typeof Rpc.HoloTemporaryEvolutionId

export type ItemProto = keyof typeof Rpc.Item