import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ParamMap, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { mimeType } from '../posts/mime-type.validator';
import { Post } from '../posts/post.model';

import { PostsService } from '../posts/posts.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeResult: string;
  posts: any =[] ;
  islogin:boolean=true;
  UserName:string='user name1';


 filterTerm:string;
 page = 1;
 count = 0;
 tableSize = 4;
 tableSizes = [3,5,6,8,10,15];
 onTableDataChange(event:any){
  this.page = event;
  this.ngOnInit();
}  

onTableSizeChange(event:any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.ngOnInit();
}  

 likes:number=10;
 comments:number=17;

 question:'';
 answer:'';
  constructor(private authService: AuthService,private modalService: NgbModal,public postsService: PostsService,private router:Router,) {

   }
  
  addPost= new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  })
   ngOnInit() { 
    this.postsService.getPosts().subscribe((result) => {  
      this.posts=result;
    }) 
   }
 
   setInput(inputData:string){
    // console.log(inputData);
    this.filterTerm=inputData;
   }

   alert:boolean=false;
   collectPost()
   {
    
     this.postsService.savePost(this.addPost.value).subscribe((result) => {
      this.alert=true;
      window.location.reload();
     })
     this.addPost.reset({})
   }
   closeAlert(){
    this.alert=false
  }

  open(content) {
    if(this.islogin == true){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    else {
      this.router.navigate(['/login']);
    }
      
    
    
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
