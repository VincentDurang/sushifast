import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManagerBoxService } from 'src/app/service/manager-box.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  itemCount: number = 0;
  itemCountSubscription: Subscription | null = null;

  constructor(private boxService: ManagerBoxService) {}

  ngOnInit(): void {
    this.itemCountSubscription = this.boxService.itemCount$.subscribe(
      (count) => {
        this.itemCount = count;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.itemCountSubscription) {
      this.itemCountSubscription.unsubscribe(); // Désabonnez-vous du sujet observable
    }
  }
}
