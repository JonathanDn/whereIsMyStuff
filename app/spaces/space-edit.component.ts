import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';
import {UploadDemoComponent} from '../shared/upload-demo/upload-demo.component'

@Component({
  moduleId: module.id,
  // selector: 'space-edit',
  templateUrl: 'space-edit.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, UploadDemoComponent]
})
export class SpaceEditComponent implements OnInit {

  private frmSpace: FormGroup;
  private spaceToEdit: SpaceModel;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spaceService: SpaceService) { }

  ngOnInit() {
    console.log('this.route.params', this.route.params);
    this.prepareForm();
    this.route.params.subscribe(params => {
        const id = params['id'];
        // This means EDIT mode
        if (id) {
          this.spaceService.get(id)
            .then((space) =>{

                this.spaceToEdit = space;
                console.log('in edit, ajax returned : ',  this.spaceToEdit,  this.frmSpace.controls );
                (<FormControl>this.frmSpace.controls['name']).updateValue(space.name);
                // (<FormControl>this.frmSpace.controls['power']).updateValue(space.power);
            });
        }
      });
  }
  save() {
    const spaceId = (this.spaceToEdit)?  this.spaceToEdit.id : undefined;
    console.log('this.frmSpace.value', this.frmSpace.value);
    console.log('spaceId:', spaceId);
    
    // console.log('here');

    // succefuly saving to spaces array in DB
    this.spaceService.save(this.frmSpace.value, spaceId)
      .then(()=>{
          this.router.navigate(['/space']);
      });

  }

  prepareForm() {
     this.frmSpace = this.formBuilder.group({
      name: ['',
              Validators.compose([Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(100)])],
      // power: [5, Validators.required]
    });
  }
}
