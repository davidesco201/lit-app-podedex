export interface Evolution {
  name: string;
  type: string[];
  image: string;
}

export interface Pokemon {
  name: string;
  type: string[];
  image: string;
  evolutions: Evolution[];
}

export function parseEvolutionToPokemon(evolution: Evolution): Pokemon {
  return {
    name: evolution.name,
    type: evolution.type,
    image: evolution.image,
    evolutions: [],
  };
}
