import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toasterService: ToastrService) { }

  succes(msg: string) {
    this.toasterService.success(msg);
  }

  error(msg: string) {
    this.toasterService.error(msg);
  }

}
