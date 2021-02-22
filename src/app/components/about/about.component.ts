import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { PokemonInfo } from "src/app/models/pokemon";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
  private pokemonId: number;
  private pokeURL = "https://pokeapi.co/api/v2/pokemon/";
  public pokemonObservable$: Observable<PokemonInfo>;

  constructor(private router: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.pokemonId = this.router.snapshot.params.id;
    this.initPokemonData();
  }

  private initPokemonData(): void {
    this.pokemonObservable$ = this.http.get<PokemonInfo>(
      this.pokeURL + this.pokemonId
    );
  }
}
