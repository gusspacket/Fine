import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../servise/settings.service';
import { Settings } from '../models/settings.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  settings: Settings;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {

    this.settingsService.settings.subscribe(settings => {
      this.settings = settings
    })

  }

}
