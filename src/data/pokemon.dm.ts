import { Pokemon, Evolution } from "../model/pokemon.model.js";

class PokeDataManager {
  private baseUrl: string;
  private pokemons: Pokemon[] = [];
  public currentPage: number = 0;
  public pageSize: number = 5;

  constructor(baseUrl: string, pageSize: number = 4) {
    this.baseUrl = baseUrl;
    this.pageSize = pageSize;
  }

  async fetchPokemons(): Promise<Pokemon[]> {
    try {
      const url = `${this.baseUrl}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      this.pokemons = data.map((pokemon: any) => this.createPokemonModel(pokemon));
      return this.getPage();
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
      return [];
    }
  }

  async fetchPokemonDetails(name: string): Promise<Pokemon> {
    try {
      const url = `${this.baseUrl}?name=${name}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.length) {
        throw new Error(`Pokemon with name ${name} not found`);
      }
      return this.createPokemonModel(data[0]);
    } catch (error) {
      console.error(`Failed to fetch pokemon details for ${name}:`, error);
      throw error; 
    }
  }

  private createPokemonModel(data: any): Pokemon {
    if (!data.name || !data.type || !data.image) {
      console.warn('Invalid data received:', data);
      return {
        name: 'Unknown',
        type: [],
        image: '',
        evolutions: [],
      };
    }

    const evolutions: Evolution[] = data.evolutions?.map((evolution: any) => ({
      name: evolution.name,
      type: evolution.type.split('/'),
      image: evolution.image,
    })) || [];

    const pokemon: Pokemon = {
      name: data.name,
      type: data.type.split('/'),
      image: data.image,
      evolutions,
    };

    return pokemon;
  }

  getPage(pageNumber: number = this.currentPage): Pokemon[] {
    this.currentPage = Math.max(0, pageNumber); 
    const start = this.currentPage * this.pageSize;
    const end = Math.min(start + this.pageSize, this.pokemons.length); 
    return this.pokemons.slice(start, end);
  }

  nextPage(): Pokemon[] {
    if ((this.currentPage + 1) * this.pageSize >= this.pokemons.length) {
      console.warn('No more pages available.');
      return [];
    }
    return this.getPage(this.currentPage + 1);
  }

  previousPage(): Pokemon[] {
    if (this.currentPage === 0) {
      console.warn('Already on the first page.');
      return [];
    }
    return this.getPage(this.currentPage - 1);
  }
}

export default PokeDataManager;


