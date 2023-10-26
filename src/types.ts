import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface RawData {
  name: string;
  url: string;
}

export interface RawPokemonData {
  count: number;
  next: string;
  previous: string;
  results: RawData[];
}

export interface Pokemon {
  abilities: AbilityData[];
  base_experience: number;
  forms: RawData[];
  game_indices: GameIndex[];
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: string;
  species: RawData;
  sprites: Record<SpritesKeys, string | null>;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface AbilityData {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Ability {
  name: string;
  urs: string;
}

export interface GameIndex {
  game_index: number;
  version: RawData;
}

export interface HeldItem {
  item: Item;
  version_details: VersionDetail[];
}

export interface Item {
  item: RawData;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: RawData;
}

export interface Move {
  move: RawData;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: string;
  move_learn_method: RawData;
  version_group: RawData;
}

export enum SpritesKeys {
  back_default = 'back_default',
  back_female = 'back_female',
  back_shiny = 'back_shiny',
  back_shiny_female = 'back_shiny_female',
  front_default = 'front_default',
  front_female = 'front_female',
  front_shiny = 'front_shiny',
  front_shiny_female = 'front_shiny_female',
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: RawData;
}
export interface Type {
  slot: number;
  type: RawData;
}

export interface CardListProps {
  cards: Pokemon[];
  error: boolean;
}

export interface CardProps {
  data: Pokemon;
}

export interface SearchProps {
  setPokemons: (pokeName?: string) => Promise<void>;
  makeError: () => void;
}

export interface ErrorBoundaryProps {
  children?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

type ButtonType = JSX.IntrinsicElements['button']['type'];
export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  type?: ButtonType;
  func?: () => void;
}

export interface ErrorComponentProps {
  error: Error | null;
}
