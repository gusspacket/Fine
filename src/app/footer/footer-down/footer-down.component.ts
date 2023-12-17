import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/servise/settings.service';

@Component({
  selector: 'app-footer-down',
  templateUrl: './footer-down.component.html',
  styleUrls: ['./footer-down.component.css']
})
export class FooterDownComponent implements OnInit{

  settings: Settings;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.getAllSettings().subscribe(settings => {
      this.settings = settings
    })

  }

}
