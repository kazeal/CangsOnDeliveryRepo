import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SafeHtml implements PipeTransform{
  constructor(private sanitizer:DomSanitizer){}

  transform(html :any) {
      
    return  this.sanitizer.bypassSecurityTrustUrl(html);
  }
}