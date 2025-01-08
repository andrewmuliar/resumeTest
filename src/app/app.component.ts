import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from './services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'testresume';

  form: FormGroup;

  activeStep = 0;

  constructor(
    private fb: FormBuilder,
    private storageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.form = this.generateForm();
    this.prefillForm();
  }

  generateForm() {
    return this.fb.group({
      me: new FormGroup({
        first_name: new FormControl(null, [Validators.required]),
        last_name: new FormControl(null, [Validators.required]),
        birthday: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phone: new FormControl(null, [Validators.required]),
      }),
      education: new FormGroup({
        education_items: new FormArray([]),
        has_master_degree: new FormControl(),
      }),
      master: new FormGroup({
        education_master: new FormArray([]),
      }),
      job: new FormGroup({
        job_exp: new FormArray([]),
      }),
    });
  }

  prefillForm() {
    if (!this.storageService.isStorageEmpty()) {
      console.log('prefill');
      this.form.setValue(this.storageService.getDataFromStorage());
    }
  }

  addEducation() {
    const group = this.fb.group({
      university: new FormControl(null),
      date: new FormControl(null),
    });
    this.education.push(group);
  }

  addMasterDegree() {
    const group = this.fb.group({
      university: new FormControl(null),
      date: new FormControl(null),
      level: new FormControl(null),
    });
    this.masterDegree.push(group);
  }

  addJob() {
    const group = this.fb.group({
      place: new FormControl(null),
      role: new FormControl(null),
    });
    this.jobs.push(group);
  }

  get education() {
    return this.form.get(['education', 'education_items']) as FormArray;
  }

  get masterDegree() {
    return this.form.get(['master', 'education_master']) as FormArray;
  }

  get jobs() {
    return this.form.get(['job', 'job_exp']) as FormArray;
  }

  isGroupValid(groupName: string): boolean {
    return this.form.get(groupName)!.valid;
  }

  // Fast decision
  customNext(nextCallBack: { emit(): Function }, groupName: string) {
    if (this.isGroupValid(groupName)) {
      this.storageService.saveToLocalStorage({
        [groupName]: this.form.get(groupName)!.value,
      });
      nextCallBack.emit();
    } else {
      alert('no valid');
    }
  }

  customPrev(prevCallback: { emit(): Function }) {
    prevCallback.emit();
  }

  checkForAvailableStep(e: any) {
    // Stepper not allow to add some logic to disable or enable steps
    if (!this.isGroupValid('me')) {
      setTimeout(() => {
        // Change to last valid step
        this.activeStep = 0;
      }, 0);
    }
  }
}
