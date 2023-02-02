import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-compare-echart',
  templateUrl: './compare-echart.component.html',
  styleUrls: ['./compare-echart.component.css']
})
export class CompareEchartComponent implements OnInit {

  options: any;
  @Input() inputData: any;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputData) {
      this.generateChart();
    }
  }

  ngOnInit(): void {
    if (this.inputData) {
      this.generateChart();
    }
  }

  generateChart() {

  }
}
