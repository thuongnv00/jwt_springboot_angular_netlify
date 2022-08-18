import { Component, OnInit } from '@angular/core';
import {Song} from "../../../model/Song";
import {SongService} from "../../../service/song/song.service";
import {PageEvent} from "@angular/material/paginator";
import {TokenService} from "../../../service/auth/token.service";

@Component({
  selector: 'app-page-song',
  templateUrl: './page-song.component.html',
  styleUrls: ['./page-song.component.css']
})
export class PageSongComponent implements OnInit {
  totalElements:number = 0;
  songs: Song[] = [];
  loading:boolean;
  admin:any = ['ADMIN']
  isCheckAdmin = false;
  deleteSuccess:any = {
    message: "yes"
  }
  status = '';


  constructor(private songService: SongService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    if(JSON.stringify(this.tokenService.getRoles())==JSON.stringify(this.admin)) {
      console.log('role ',this.tokenService.getRoles());
      this.isCheckAdmin = true;
    }
    this.getListRequest({page:0,size:15})
  }

  private getListRequest(request) {
    this.loading = true;
    this.songService.pageSong(request).subscribe(data => {
      console.log(data);
      this.songs = data['content'];
      this.totalElements = data['totalElements'];
      this.loading = false;
    },error => {
      this.loading = false;

    })
  }

  nextPage(event: PageEvent) {
    console.log(event);
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    console.log(request['page']);
    console.log(request['size']);
    this.getListRequest(request);
  }

  deleteSong(id: number) {
    this.songService.deleteSong(id).subscribe(data => {
      if(JSON.stringify(this.deleteSuccess)== JSON.stringify(data)) {
        this.status = 'Delete success';
        const request = {page:0,size:15}
        this.getListRequest(request);
        // window.location.reload();
      }
    })
  }



}
