import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';
import {UploadDemoComponent} from '../shared/upload-demo/upload-demo.component'

@Component({
  moduleId: module.id,
  // selector: 'space-edit',
  templateUrl: 'edit-item.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, UploadDemoComponent]
})
export class EditItemComponent implements OnInit {

  private frmSpace: FormGroup;
  private spaceToEdit: SpaceModel;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spaceService: SpaceService, 
    private location: Location) { }

  ngOnInit() {
    // console.log('this.route.params', this.route.params);
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
            });
        } 
        // else {
        //   this.spaceToEdit = new SpaceModel();
        // }
      });
  }
  save() {
      
    console.log('daniel clicked add 1');
    const spaceId = (this.spaceToEdit)?  this.spaceToEdit.id : undefined;
    console.log('this.frmSpace.value', this.frmSpace.value);
    this.spaceService.setStoreType();
    this.spaceService.save(this.frmSpace.value,'items', spaceId)
      .then(()=>{
          this.router.navigate(['']);
      });

  }

  prepareForm() {
     this.frmSpace = this.formBuilder.group({
      name: ['',
              Validators.compose([Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(100)])],
    });
  }
}
