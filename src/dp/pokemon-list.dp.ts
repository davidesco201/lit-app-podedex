import { Pokemon } from '../model/pokemon.model';
import PokeDataManager from '../data/pokemon.dm';

export default class PokemonListPresenter {
  private dataManager: PokeDataManager;
  private pokemons: Pokemon[] = [];
  private filteredPokemons: Pokemon[] = [];
  private updatePokemons: (pokemons: Pokemon[]) => void;
  private updatePage: (page: number) => void;
  private openPage: (name: string) => void;

  constructor(
    dataManager: PokeDataManager,
    updatePokemons: (pokemons: Pokemon[]) => void,
    updatePage: (page: number) => void,
    openPage: (name: string) => void
  ) {
    this.dataManager = dataManager;
    this.updatePokemons = updatePokemons;
    this.updatePage = updatePage;
    this.openPage = openPage;
  }

  async loadPokemons() {
    this.pokemons = await this.dataManager.fetchPokemons();
    this.filteredPokemons = [...this.pokemons];
    this.updatePokemons(this.filteredPokemons);
  }

  async handleCardClick(name: string) {
    this.openPage(name);
  }

  async nextPage() {
    const pokemons = this.dataManager.nextPage();
    this.filteredPokemons = pokemons;
    this.updatePage(this.dataManager.currentPage);
    this.updatePokemons(this.filteredPokemons);
  }

  async previousPage() {
    if (this.dataManager.currentPage > 0) {
      const pokemons = this.dataManager.previousPage();
      this.filteredPokemons = pokemons;
      this.updatePage(this.dataManager.currentPage);
      this.updatePokemons(this.filteredPokemons);
    }
  }

  filterPokemons(searchTerm: string) {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.updatePokemons(this.filteredPokemons);
  }
}
