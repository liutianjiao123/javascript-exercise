import {Component, OnInit} from '@angular/core';
import {ThemeDefinition, Themes} from './themeDefinition';
import {environment} from '../environments/environment';
import {ThemeService} from './theme.service';
import {StorageMap} from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'nblogger';
  themes: Themes;
  selectedTheme: string;
  test = 'test';
  tipText: string = '请输入信息';
  username = false;
  pwd = false;
  heroes = [{name: 'asd'}, {name: 'sad'}, {name: 'egd'}, {name: 'qdc'}, {name: 'dfgh'}];
  showSad: boolean;
  hero: any;
  condition: boolean;

  constructor(private themeService: ThemeService,
              private storage: StorageMap) {

  }

  trackById() {
    console.log('11111111111111');
  }

  onFocus() {
    this.username = true;
  }

  onBlur(e) {
    if(e.target.value) {return false;}
    this.pwd = false;
    this.username = false;
  }

  ngOnInit() {
    this.themeService.getThemes()
      .subscribe(data => {
        this.themes = data;
        this.storage.get('app-theme-name').subscribe(name => {
          const themeName = name ? name : environment.defaultTheme;
          const currentTheme = this.themes.themes.find(t => t.name === themeName);
          this.applyTheme(currentTheme);
        });

      });
  }

  onThemeSelectionChanged(event: ThemeDefinition) {
    console.log(event);
    this.applyTheme(event);
  }

  private applyTheme(def: ThemeDefinition): void {

    if (def) {
      this.storage.set('app-theme-name', def.name).subscribe(()=>{});
      this.selectedTheme = def.name;
      const links = document.getElementsByTagName('link');
      for(let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.getAttribute('rel').indexOf('style') !== -1 &&
          link.getAttribute('type').indexOf('text') !== -1) {
          link.setAttribute('href', def.cssMin);
        }
      }
    }
  }

}
