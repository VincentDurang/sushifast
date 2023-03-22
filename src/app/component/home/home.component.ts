import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupBoxService } from 'src/app/service/lookup-box.service';
import { Box } from 'src/app/models/Box';
import * as BOX  from 'boxes-sushi.json';
import { ManagerBoxService } from 'src/app/service/manager-box.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  boxes: Box[] = [];

  constructor(private boxService: ManagerBoxService) { }

  ngOnInit() {
    this.boxService.getAllBoxes().subscribe((data) => {
      this.boxes = data;
    });
  }
}
