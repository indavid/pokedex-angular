import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
})
export class GridComponent {
  constructor(private http: HttpClient) {}

  pokemons: any[] = [];
  nextUrl: string = "";
  prevUrl: string = "";
  offset: number = 0;
  totalPokemons: number = 900;
  limit: number = 12;
  isLoading: boolean = true;

  ngOnInit() {
    this.fetchPokemons("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12");
  }

  fetchPokemons(url: string) {
    this.http
      .get(url)
      .pipe(
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe((resp: any) => {
        console.log(resp);
        this.pokemons = resp.results;
        this.nextUrl = resp.next;
        this.prevUrl = resp.previous;
        this.isLoading = false;
      });
  }

  goToNextPage() {
    if (this.nextUrl && this.offset + this.limit < this.totalPokemons) {
      this.fetchPokemons(this.nextUrl);
      this.offset += this.limit;
    }
  }

  goToPreviousPage() {
    if (this.prevUrl && this.offset - this.limit >= 0) {
      this.fetchPokemons(this.prevUrl);
      this.offset -= this.limit;
    }
  }
}
