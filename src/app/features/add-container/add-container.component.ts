import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddContainerService } from './services/add-container.service';
import { ContainerData } from './models/add-container.model';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'add-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-container.component.html',
  styleUrl: './add-container.component.css',
})
export class AddContainerComponent {
  @Output() containerAdded = new EventEmitter<any>();

  containerForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private addContainerService: AddContainerService,
    private localStorageService: LocalStorageService
  ) {
    this.containerForm = this.fb.group({
      containerNo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]{4}[0-9]{7}$/), // 4 letters followed by 7 digits
        ],
      ],
    });
  }

  addContainer() {
    const containerNo = this.containerForm.value.containerNo;

    this.isLoading = true;

    // Check in localstorage if container number is already added or not
    const containers = this.localStorageService.getContainersData();
    const isContainerAlreadyAdded = containers.find(
      (container) => container.containerInfo.containerNumber === containerNo
    );

    if (isContainerAlreadyAdded) {
      this.errorMessage = 'Container is already added in watchlist!';
      this.isLoading = false;
    } else {
      this.addContainerService
        .getContainerByContainerNo(containerNo)
        .subscribe({
          next: (response: ContainerData) => {
            this.containerAdded.emit(response); // Emit container data to parent
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = error || 'Container not found.';
            this.isLoading = false;
          },
        });
    }
  }

  close() {
    this.containerAdded.emit(null); // Notify parent to close modal
  }
}
