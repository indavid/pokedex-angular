import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent {
  searchQuery: string = "";
  pokemons: any[];
  suggestions: any[];
  selectedSuggestionIndex: number = -1;
  showDropdownItems: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.pokemons = [];
    this.suggestions = [];
  }

  ngOnInit() {
    this.http
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=900")
      .pipe(
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        map((resp: any) => resp.results.map((pokemon: any) => pokemon.name))
      )
      .subscribe((data: any) => {
        this.pokemons = data;
      });
  }

  showDropdown() {
    this.suggestions = this.pokemons;
  }

  hideDropdown() {
    this.suggestions = [];
  }

  search() {
    if (this.searchQuery) {
      this.suggestions = this.pokemons.filter((pokemon) =>
        pokemon.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.suggestions = this.pokemons;
    }
  }

  onSearch() {
    console.log("i searched");
    if (this.searchQuery) {
      const selectedPokemon = this.pokemons.find(
        (pokemon) => pokemon.toLowerCase() === this.searchQuery.toLowerCase()
      );

      if (selectedPokemon) {
        this.router.navigate(["/pokemon", selectedPokemon]);
        this.searchQuery = "";
        this.suggestions = [];
      } else {
        console.log("Pokemon not found");
      }
    }
  }

  onEnter() {
    if (this.suggestions.length > 0) {
      const firstSuggestion = this.suggestions[0];
      this.onSuggestionClick(firstSuggestion);
    } else {
      this.onSearch();
    }
  }

  onSuggestionClick(suggestion: string) {
    this.searchQuery = suggestion;
    console.log("searchQuery: ", this.searchQuery);
    this.selectedSuggestionIndex = -1;
    this.onSearch();
  }

  selectNextSuggestion() {
    if (this.selectedSuggestionIndex < this.suggestions.length - 1) {
      this.selectedSuggestionIndex++;
    }
  }

  selectPreviousSuggestion() {
    if (this.selectedSuggestionIndex > 0) {
      this.selectedSuggestionIndex--;
    }
  }
}
