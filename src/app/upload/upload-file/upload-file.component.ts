import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  selectFile: File;
  ref: AngularFireStorageReference;
  downloadUrl: string;
  checkUploadAvatar = false;
  @Output()
  giveUrlToCreate = new EventEmitter<string>();
  constructor(private afStorage:AngularFireStorage) { }

  ngOnInit(): void {
  }

  // khi upload file qua input duoi dang 1 hoac nhieu file thi tep do se duoc luu thong qua su kien $event duoc kich hoat
  // va se duoc luu tru trong $event.target.files
  onFileChanged($event) {
    this.selectFile = $event.target.files[0]
  }
  onUpload(){
    this.checkUploadAvatar = true;
    const id = Math.random().toString(36).substring(2)// tao 1 id rieng hien thi tren db cua firebase
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectFile)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();// tra ve 1 chui sieu van ban tren firebase
      })
      .then(downloadUrl => {
        this.downloadUrl = downloadUrl;
        this.giveUrlToCreate.emit(this.downloadUrl)
        this.checkUploadAvatar = false;
        return downloadUrl;
        // chuyen value tu componet cha sang con
      })
      .catch(error => {
        console.log(`Failed to upload avatar and get link ${error}`)
      })
  }

}
