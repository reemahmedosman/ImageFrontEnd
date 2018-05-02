// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';

// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {

//   constructor(public navCtrl: NavController) {

//   }

// }
// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { AlertController } from 'ionic-angular/components/alert/alert-controller';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { HttpClient,HttpHeaders } from '@angular/common/http';


// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {
//   imgUrl;
//   imageName;
//   constructor(public navCtrl: NavController,public alertCtrl:AlertController,public camera: Camera,public http:HttpClient) {

//   }
//   pic(){
//     const options: CameraOptions = {
//       quality: 100,
//       destinationType: this.camera.DestinationType.DATA_URL,
//       encodingType: this.camera.EncodingType.JPEG,
//       mediaType: this.camera.MediaType.PICTURE
//     };
    
//     this.camera.getPicture(options).then((imageData) => {
//      this.imageName = imageData;
//      this.imgUrl = 'data:image/jpeg;base64,' + imageData;
//      this.transferData()

//     }, (err) => {
//      // Handle error
//     });
//   }
//   transferData(){
//     let formData = new FormData();
//     // formData.append('category', 1);
//     // formData.append('status', 'Y');
//     formData.append('image', this.imageName); 
//     this.http.post("http://192.168.1.36:8000/api-imageUpload", formData, {withCredentials: true}).subscribe(res => {
      
      
//         var message = "The image was successfully uploaded!";
//         this.showAlert(message);
      
      
//     }, (err) => {
//       var message = "Error in uploading file " + err.errors;
//       this.showAlert(message);
//     });
//   }
  

//   showAlert(message) {
//     let alert = this.alertCtrl.create({
//       title: 'Error!',
//       subTitle: message,
//       buttons: ['OK']

//     });
    
//     alert.present();
//   }

// }
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imgUrl;
  imageName;
  number;
  show = false;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public camera: Camera,public http:HttpClient) {

  }
  pic(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };  
    this.camera.getPicture(options).then((imageData) => {
     this.imageName = imageData;
     this.show=true;
     this.imgUrl = 'data:image/jpeg;base64,' + imageData;
    });
  }
  choosePhoto(){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
    this.imageName = imageData;
    this.show=true;
    this.imgUrl = 'data:image/jpeg;base64,' + imageData;
    });
  }
  transferData(){
    let formData = new FormData();
    if ( this.imageName){
       formData.append('image', this.imageName); 
       //formData.append('number',this.number);
      this.http.post("http://localhost:8000/imageUpload/", formData, {withCredentials: true}).subscribe((res:any) => {     
      var message = "The image was successfully uploaded!";
      this.showAlert(message);   
      }, (err) => {
        var message = "Error in uploading file " + err.errors;
        this.showAlert(message);
      });
    }
    else {
      this.showAlert("kindly enter the number of the meter and take a picture");
    } 
  }
  
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: message,
      buttons: ['OK']

    });   
    alert.present();
  }
}