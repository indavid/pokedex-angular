import { Component, Input } from "@angular/core";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.scss"],
})
export class ProgressBarComponent {
  @Input() stat: number = 0;

  getFillWidth(): string {
    const fillWidth = (this.stat / 255) * 100;
    return `${fillWidth}%`;
  }

  getUnfilledWidth(): string {
    const unfilledWidth = 100 - (this.stat / 255) * 100;
    return `${unfilledWidth}%`;
  }
}
