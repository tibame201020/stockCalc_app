import { StrategySummary } from './../../models/Strategy';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-strategy-summary',
  templateUrl: './strategy-summary.component.html',
  styleUrls: ['./strategy-summary.component.css']
})
export class StrategySummaryComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    strategy: [this.data[0].name],
  });
  strategySummary:StrategySummary = this.data[0];

  constructor( public dialogRef: MatDialogRef<StrategySummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:StrategySummary[],
    public dialog: MatDialog,private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(value => {
      this.updateStrategySummary(value.strategy);
    })
  }

  updateStrategySummary(strategy:string) {
    this.data.forEach(element => {
      if (element.name == strategy) {
        this.strategySummary = element;
      }
    });
  }

}
