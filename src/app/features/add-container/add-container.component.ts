import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddContainerService } from './services/add-container.service';
import { ContainerData } from './models/add-container.model';

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
    private addContainerService: AddContainerService
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
    this.addContainerService.getContainerByContainerNo(containerNo).subscribe({
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

  close() {
    this.containerAdded.emit(null); // Notify parent to close modal
  }
}
