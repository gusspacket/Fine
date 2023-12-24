import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../servise/settings.service';
import { Settings } from '../models/settings.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  settings: Settings;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {

    this.settingsService.settings.subscribe(settings => {
      this.settings = settings

    })


  }

}{


}
