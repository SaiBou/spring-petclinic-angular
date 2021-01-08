import { VetService } from 'app/vets/vet.service';
import { Vet } from './../vet';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { VisitService } from './../../visits/visit.service';
import { Visit } from './../../visits/visit';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vet-show-visits',
  templateUrl: './vet-show-visits.component.html',
  styleUrls: ['./vet-show-visits.component.css']
})
export class VetShowVisitsComponent implements OnInit {

  plannedVisits: Visit[];
  pastVisits: Visit[];
  vet: Vet;
  myDate : string;

  constructor(private visitService: VisitService,
              private vetService: VetService,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');  
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.visitService.getVisits().subscribe( res => this.plannedVisits = res)
    this.visitService.getVisits().subscribe( res => this.pastVisits = res)
    this.vetService.getVetById(id).subscribe( res => this.vet = res)  
  }
}
