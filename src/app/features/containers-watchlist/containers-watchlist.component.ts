import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddContainerComponent } from '../add-container/add-container.component';
import { ContainerData } from '../add-container/models/add-container.model';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-containers-watchlist',
  standalone: true,
  imports: [CommonModule, AddContainerComponent],
  templateUrl: './containers-watchlist.component.html',
  styleUrl: './containers-watchlist.component.css',
})
export class ContainersWatchlistComponent {
  containers: ContainerData[] = []; // Array to hold containers
  showModal: boolean = false; // Track modal visibility
  selectedContainer: any = null; // Track container being added

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load containers from localStorage when the component initializes
    const storedContainers = this.localStorageService.getContainersData();
    if (storedContainers) {
      this.containers = storedContainers;
    }
  }

  openAddContainerDialog() {
    this.showModal = true; // Show the modal
  }

  closeAddContainerDialog() {
    this.showModal = false; // Hide the modal
  }

  handleContainerAdded(container: ContainerData) {
    if (container) {
      this.containers.push(container);
      this.saveToLocalStorage(); // Save the updated containers list
    }
    this.closeAddContainerDialog();
  }

  private saveToLocalStorage(): void {
    this.localStorageService.setContainersData(this.containers);
  }

  navigateToCheckout(container: ContainerData): void {
    // Navigate to checkout and pass the container fee as state
    this.router.navigate(['dashboard/checkout'], { state: { container } });
  }
}
