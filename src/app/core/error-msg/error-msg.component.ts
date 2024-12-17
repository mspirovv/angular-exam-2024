import { Component, Input, OnInit } from '@angular/core';
import { ErrorMsgService } from './error-msg.service';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css',
})
export class ErrorMsgComponent implements OnInit {
  @Input() errMsg: string = '';


  constructor(private errorMsgService: ErrorMsgService) {}

  ngOnInit(): void {
    this.errorMsgService.apiError$.subscribe((err: any) => {
      this.errMsg = err?.error?.message;
      console.log('Error message:', this.errMsg)
    });
  }

  getErrMsg() {
    return this.errMsg;
  }
}
