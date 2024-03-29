import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MyApiService } from '../my-api.service';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world.component.html',
  styleUrl: './world.component.css'
})
export class WorldComponent implements AfterViewInit {
  @ViewChild('svgObject') svgObject!: ElementRef;
  responseData: any;
  constructor(private myApiService: MyApiService) {}

  ngAfterViewInit(): void {
    this.svgObject.nativeElement.addEventListener('load', () => {
      const svgDoc = this.svgObject.nativeElement.contentDocument;
      const paths = svgDoc.querySelectorAll('path');

      paths.forEach((path: { addEventListener: (arg0: string, arg1: (event: { target: any; }) => void) => void; }) => {
        path.addEventListener('click', (event: { target: any; }) => {
          this.onCountryClick(event.target);
        })
      });
    })
  }

  onCountryClick(target: any): void {
  target.style.fill = 'red';

  this.myApiService.getData(target.id).subscribe((data) => {
    this.responseData = data;

    const responseDataObj = this.responseData[1][0]
    document.getElementById('country')!.innerHTML = responseDataObj.name;
    document.getElementById('capital')!.innerHTML = responseDataObj.capitalCity;
    document.getElementById('region')!.innerHTML = responseDataObj.region.value;
    document.getElementById('income')!.innerHTML = responseDataObj.incomeLevel.value;
    document.getElementById('lending')!.innerHTML = responseDataObj.lendingType.value;
    document.getElementById('coordinates')!.innerHTML = `${responseDataObj.latitude}\u00B0 ${responseDataObj.longitude}\u00B0`;
  })

  const paths = target.parentElement.querySelectorAll('path');
  paths.forEach((path: { style: { fill: string; }; }) => {
    if (path !== target) {
      path.style.fill = ''
    }
  })

  }
}

