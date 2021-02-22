import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Pokemon, PokemonResult } from "src/app/models/pokemon";
import { pluck, tap } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  private pokeURL = "https://pokeapi.co/api/v2/pokemon?offset=0";

  public urlIdLookUp: any;
  public pokemons: PokemonResult[];

  public text: string;
  public filteredPokemons: PokemonResult[] = [];

  ngOnInit(): void {
    this.loadPokemonData();
  }

  private async loadPokemonData(): Promise<void> {
    const fetchAll = await this.http
      .get<Pokemon>(this.pokeURL)
      .pipe(
        pluck("results"),
        tap((results: PokemonResult[]) => {
          this.urlIdLookUp = results.reduce(
            (acc, cur, idx) => (acc = { ...acc, [cur.name]: idx + 1 })
          );
        })
      )
      .subscribe((data: PokemonResult[]) => {
        this.pokemons = this.filteredPokemons = data;
        console.log(this.pokemons);
      });
  }

  public onChange(updatedValue: string): void {
    this.filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.name.includes(updatedValue)
    );
  }
}
