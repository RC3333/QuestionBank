import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  
  url="http://localhost:3000/posts"
  constructor(private http: HttpClient) { }
  getPosts(){
    return this.http.get(this.url)
  }

  savePost(data)
  {
    //console.warn(data)
     return this.http.post(this.url,data)
  }

  deletePost(id){
    return this.http.delete(`${this.url}/${id}`)
  }
  getCurrentPost(id){
    return this.http.get(`${this.url}/${id}`)
  }
  updatePost(id,data){
    return this.http.put(`${this.url}/${id}`,data)
  }

}
