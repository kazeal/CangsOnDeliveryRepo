import { Component } from '@angular/core';

/**
*	This class represents the lazy loaded HomeComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'home-cmp',
	templateUrl: 'home.component.html'
})

export class HomeComponent {

	/*
		uploadFile: any;
		hasBaseDropZoneOver: boolean = false;
		options: Object = {
			url: 'http://localhost:10050/upload'
		};
		sizeLimit = 2000000;
		
		handleUpload(data :any): void {
			if (data && data.response) {
			data = JSON.parse(data.response);
			this.uploadFile = data;
			}
		}
		
		fileOverBase(e:any):void {
			this.hasBaseDropZoneOver = e;
		}
		
		beforeUpload(uploadingFile :any): void {
			if (uploadingFile.size > this.sizeLimit) {
			uploadingFile.setAbort();
			alert('File is too large');
			}
		}
*/
}
