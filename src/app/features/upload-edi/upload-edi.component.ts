import { Component } from '@angular/core';
import { EdiParserService } from './services/edi-parser.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-edi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-edi.component.html',
  styleUrl: './upload-edi.component.css',
})
export class UploadEdiComponent {
  selectedFile: File | null = null;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  apiErrorMessage: string | null = null;

  constructor(private ediParserService: EdiParserService) {}

  onFileSelected(event: Event) {
    this.apiErrorMessage = null;

    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    if (file && file.name.endsWith('.txt')) {
      this.selectedFile = file;
      this.errorMessage = null;
    } else {
      this.selectedFile = null;
      this.errorMessage =
        'Please select a valid EDI file having .txt extention.';
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.errorMessage = 'No file selected.';
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;
    this.apiErrorMessage = null;

    this.ediParserService.uploadFile(this.selectedFile).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = response.message;
      },
      error: (error) => {
        this.isLoading = false;
        this.apiErrorMessage = error;
      },
    });
  }
}
