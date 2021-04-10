import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import * as EventEmitter from 'node:events';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  closeResult: string; 
  islogin:boolean=false;
  
  @Output()
  notify:EventEmitter<string> =new EventEmitter<string>();
  collapsed = true;
  constructor(private modalService: NgbModal, private router: Router) {
    
    
  }
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  

  ngOnInit(): void {}
  
  onEnter(value: string) {
   
     this.notify.emit(value);

   }

  onSignup(form:NgForm){
    console.log(form.value);
  }
  onLogin(form:NgForm){
   
    this.islogin=true;
    alert('login Successfully');
  }
  onlogout(){
    this.islogin=false;
    window.location.reload();
  }
  open(content) {
 
      this.modalService.open(content, {size: 'lg',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });  
    
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
