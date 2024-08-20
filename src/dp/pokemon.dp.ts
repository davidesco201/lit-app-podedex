import { Pokemon } from "../model/pokemon.model";
import PokeDataManager from "../data/pokemon.dm";

export default class PokemonPresenter {
  private dataManager: PokeDataManager;
  private pokemon: Pokemon | undefined = undefined;
  private openPage: (name: string) => void;

  constructor(dataManager: PokeDataManager, openPage: (name: string) => void) {
    this.dataManager = dataManager;
    this.pokemon = undefined;
    this.openPage = openPage;
  }

  async loadEvolutions(name: string): Promise<Pokemon> {
    this.pokemon = await this.dataManager.fetchPokemonDetails(name);
    return this.pokemon;
  }

  async loadPokemon(name: string, isEvolution: boolean): Promise<Pokemon> {
    if (isEvolution) {
      const pokemons = await this.dataManager.fetchPokemons();
      for (const pokemon of pokemons) {
        const evolution = pokemon.evolutions.find(
          (evolution) => evolution.name === name
        );
        if (evolution) {
          return {
            name: evolution.name,
            type: evolution.type,
            image: evolution.image,
            evolutions: [],
          };
        }
      }
    }
    return await this.dataManager.fetchPokemonDetails(name);
  }

  async handleCardClick(name: string) {
    this.openPage(name);
  }
}
