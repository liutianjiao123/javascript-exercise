import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ThemeDefinition, Themes} from '../themeDefinition';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {

  @Input() themes: Themes;
  @Input() selectedTheme: string;
  @Output() themeSelectionChanged: EventEmitter<ThemeDefinition> = new EventEmitter();

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {

  }

  onThemeItemSelected(event: any) {
    const selectedThemeName = event.target.text.trim();
    const selectedTheme = this.themes.themes.find(t => {
      return t.name === selectedThemeName;
    });
    this.themeSelectionChanged.emit(selectedTheme);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const {themes} = changes;
    // if (themes) {
    //   this.themes = themes.currentValue;
    //   console.log(this.themes);
    // }
  }

}
