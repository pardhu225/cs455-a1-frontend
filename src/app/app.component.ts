import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';
import iziToast from 'izitoast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments: string;
  satisfaction = 3;
  easeofuse = 3;
  impact = 3;
  recommendation = 3;
  disabled = false;
  formSubmitted = false;
  constructor(private http: HttpClient, private dialog: MatDialog) {

  }

  submitForm() {
    this.disabled = true;
    this.dialog.open(ProgressDialogComponent, {
      disableClose: true
    });
    this.http.post('api/collect-feedback', {
      comments: this.comments,
      satisfaction: this.satisfaction,
      easeofuse: this.easeofuse,
      recommendation: this.recommendation,
      impact: this.impact
    }).toPromise().then(res => {
      this.dialog.closeAll();
      this.formSubmitted = true;
      iziToast.success({
        title: 'Success',
        message: 'Feedback sent successfully'
      });
    }).catch(err => {
      console.error(err);
      this.disabled = false;
      this.dialog.closeAll();
      iziToast.error({
        title: 'Error',
        message: 'Feedback not sent due to unknown error'
      });
    });
  }

  resetForm() {
    this.formSubmitted = false;
    this.disabled = false;
    this.easeofuse = this.impact = this.recommendation = this.satisfaction = 3;
    this.comments = null;
  }
}
