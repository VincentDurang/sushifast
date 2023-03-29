import { Component } from '@angular/core';
import { Box } from 'src/app/models/Box';
import { IBoxs } from 'src/app/models/iBoxes';
import { ManagerBoxService } from 'src/app/service/manager-box.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {

  
  constructor(private managerBoxService: ManagerBoxService) {
  
  }


  ngOnInit(): void {
    this.managerBoxService.editHackerEvent
      .subscribe((box: IBoxs) => { 
        console.log('Event message editEvent')
      
        
      })
  }
}
