import { Component, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { from, Observable, of } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { ChartModule } from "primeng/chart";

@Component({
  selector: "app-grid-item-detail",
  templateUrl: "./grid-item-detail.component.html",
  styleUrls: ["./grid-item-detail.component.scss"],
})
export class GridItemDetailComponent {
  name: string = "";
  pokemon: any = {};
  species: any = {};
  basicData: any;
  sum: number = 0;
  isLoading: boolean = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.name = params["name"];
          return this.http
            .get(`https://pokeapi.co/api/v2/pokemon/${this.name}`)
            .pipe(
              catchError((err) => {
                console.error(err);
                return of([]);
              })
            );
        }),
        switchMap((resp) => {
          this.pokemon = resp;
          return this.http.get(
            `https://pokeapi.co/api/v2/pokemon-species/${this.pokemon.id}`
          );
          this.isLoading = false;
        })
      )
      .subscribe((resp) => {
        this.isLoading = false;
        this.species = resp;
        this.sum =
          this.pokemon.stats[0].base_stat +
          this.pokemon.stats[1].base_stat +
          this.pokemon.stats[2].base_stat +
          this.pokemon.stats[3].base_stat +
          this.pokemon.stats[4].base_stat +
          this.pokemon.stats[5].base_stat;
        this.basicData = {
          labels: [
            "hp",
            "attack",
            "defense",
            "special-attack",
            "special-defense",
            "speed",
          ],
          datasets: [
            {
              label: this.pokemon.name
                .slice(0, 1)
                .toUpperCase()
                .concat(this.pokemon.name.slice(1)),
              data: [
                this.pokemon.stats[0].base_stat,
                this.pokemon.stats[1].base_stat,
                this.pokemon.stats[2].base_stat,
                this.pokemon.stats[3].base_stat,
                this.pokemon.stats[4].base_stat,
                this.pokemon.stats[5].base_stat,
              ],
              backgroundColor: [
                "rgba(255, 159, 64, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 205, 0, 0.2)",
                "rgba(225, 45, 45, 0.2)",
                "rgba(54, 112, 255, 0.2)",
              ],
              borderColor: [
                "rgb(255, 159, 64)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(255, 205, 0)",
                "rgb(225, 45, 45)",
                "rgb(54, 112, 255)",
              ],
              borderWidth: 1,
            },
          ],
        };
      });
  }

  // updateImageSrc() {
  //   const image = document.querySelector(".detail-img") as HTMLImageElement;
  //   image.src = `assets/pokemon/${this.pokemon.id}.png`;
  // }

  getFlavorText(flavorTexts: any[], lang: string): string {
    if (flavorTexts) {
      const entry = flavorTexts.find(
        (flavorText: any) => flavorText.language.name === lang
      );
      return entry.flavor_text;
    } else {
      return "";
    }
  }

  getTypeColorClass(type: string): string {
    if (type === "normal") {
      return "normal-color";
    } else if (type === "fire") {
      return "fire-color";
    } else if (type === "water") {
      return "water-color";
    } else if (type === "grass") {
      return "grass-color";
    } else if (type === "electric") {
      return "electric-color";
    } else if (type === "ice") {
      return "ice-color";
    } else if (type === "fighting") {
      return "fighting-color";
    } else if (type === "poison") {
      return "poison-color";
    } else if (type === "ground") {
      return "ground-color";
    } else if (type === "flying") {
      return "flying-color";
    } else if (type === "psychic") {
      return "psychic-color";
    } else if (type === "bug") {
      return "bug-color";
    } else if (type === "rock") {
      return "rock-color";
    } else if (type === "ghost") {
      return "ghost-color";
    } else if (type === "dark") {
      return "dark-color";
    } else if (type === "dragon") {
      return "dragon-color";
    } else if (type === "steel") {
      return "steel-color";
    } else if (type === "fairy") {
      return "fairy-color";
    } else {
      return "";
    }
  }
}
