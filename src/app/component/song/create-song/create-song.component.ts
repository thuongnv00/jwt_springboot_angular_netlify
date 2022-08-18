import { Component, OnInit } from '@angular/core';
import {SongService} from "../../../service/song/song.service";
import {Song} from "../../../model/Song";

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  form:any = {};
  status='Please create Song';
  error1:any ={
    message:"noavatar"
  };
  error2:any ={
    message:"nomp3url"
  };
  success:any ={
    message:"yes"
  };
  song:Song;
  constructor(private songService:SongService) { }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.song = new Song(
      this.form.nameSong,
      this.form.lyrics,
      this.form.avatarURl,
      this.form.mp3Url,
    )
    this.songService.createSong(this.song).subscribe({next: data => {
      if(JSON.stringify(this.error1)==JSON.stringify(data)) {
        this.status = "The avatar is required. Please select avatar"
      }
      if(JSON.stringify(this.error2)==JSON.stringify(data)) {
        this.status = "The file is required. Please select file"
      }
      if(JSON.stringify(this.success)==JSON.stringify(data)) {
        this.status = "Create Song success !"
      }
    },error: error => {
      this.status = error;
      console.log('chua dang nhap');
    }})
  }
  onchangeAvatar($event) {
    this.form.avatarURl = $event;
  }
  onchangeFile($event) {
    this.form.mp3Url = $event;
  }

}
