import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myangular-app';
  
  //declare variables
  apiResponseMessage: any;
  checked: boolean;
  
  
  //id_1_status: any = "ON"
  restItems: any;
  restItemsUrl:any = 'https://ajith-home-automation.herokuapp.com/homeautomation';

  constructor(private http: HttpClient) {}

  ngOnInit() {
     document.addEventListener("deviceready", function() { 
						//alert(device.platform); 
						
				}, false); 
     this.apiResponseMessage = "Loading.........";
     this.apiResponseMessage = this.getRestItems();
 }

  // Read all REST Items
  getRestItems(){
    
	return this.http.get<any[]>(this.restItemsUrl).subscribe(data => {
      //console.log(data.length);
	  //console.log(data[0].id);
	  //console.log(data[0].Status);
	  //console.log(data[0].text);
	  //this.apiResponseMessage = JSON.stringify(data);
	  this.apiResponseMessage = "Loading.........";
	  this.apiResponseMessage = JSON.stringify(data[0]);
	 
   },
   err => {
   console.log("Error During get:"+ err.message)
      this.apiResponseMessage = err.message;
   }
   
   );
	
  }
   
  
  onClickGet() {
    this.apiResponseMessage = "Loading.........";
    this.apiResponseMessage = this.getRestItems();
  }
  
  onClickPost() {
  
  
  console.log("Post method initiated..");
  
  //let jsonBody = "[{'id':1,'description':'Hall', 'Status': true},{'id':2,'description':'Bedroom', 'Status': true},{'id':3,'description':'kitchen', 'Status': false}]"
  
  this.http.post(this.restItemsUrl, [{'id':1,'description':'Hall', 'Status': this.checked? 'ON' : 'OFF'}], {responseType: 'text'})
      .subscribe(
        res => {
          console.log("Post response: " + res);
		  this.apiResponseMessage = this.getRestItems();
        },
        err => {
          console.log("Error Status:" + err.status);
		  console.log("Error Message:" + err.message);
		  this.apiResponseMessage = err.message;
        }
      );
	  
  }
  
  
}
