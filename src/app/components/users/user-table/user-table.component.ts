import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from '../../../services/users/users.service';
import { selectUsers } from '../../../states/users/users.selector';
import { AppState } from '../../../states/app.state';
import { UserType, UsersState } from '../../../interfaces/users/users.interface';
import {
  saveUser,
  setInitialUserList,
} from '../../../states/users/users.action';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    SpinnerComponent,
    ButtonComponent
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UserTableComponent {
  userData: UserType[] = [];
  columnsToDisplay = ['firstName', 'lastName', 'age', 'email'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  expandedElement!: UserType | null;
  contactForm!: FormGroup;
  showButtonSpinner = false;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private service: UserService
  ) {
    for (let i = 0; i < 30; i++) {
      this.userData?.push({
        firstName: '',
        lastName: '',
        age: 0,
        email: '',
        id: 0
      });
    }
    this.getUserData();
    this.createContactForm();
  }

  get formControls() {
    return this.contactForm['controls'];
  }

  getUserData() {
    this.service.getUserData().subscribe({
      next: (res: HttpResponse<UsersState>) => {
        console.log(
          'HTTP Method : GET\nAPI URL :',
          res.url + '\nSTATUS : ' + res.status + ' ' + res.statusText
        );

        let data = res.body?.users?.map((user: UserType) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          email: user.email,
        }));
        console.log('DATA :', data);
        this.store.dispatch(setInitialUserList({ userList: data }));

      },
      error: (error) => {
        this.userData = [];
        console.log(error.status + ' : ' + error.message);
      },
      complete: () => {
        this.store.select(selectUsers).subscribe((data) => {
          if (data) {
            this.userData = data;
          }
        });
      },
    });
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      firstName: ['sample', Validators.required],
      lastName: ['sample', Validators.required],
      age: ['10', [Validators.required, Validators.min(1)]],
      email: [
        'sample@user.com',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      id: [''],
    });
  }

  expandClick(element: UserType) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.contactForm.setValue({
      firstName: element.firstName,
      lastName: element.lastName,
      age: element.age,
      email: element.email,
      id: element.id,
    });
  }

  onSave() {
    this.showButtonSpinner = true;
    setTimeout(() => {
      this.store.dispatch(saveUser(this.contactForm.value));
      this.showButtonSpinner = false;
    }, 5000);
  }

  onCancel() {
    this.expandedElement = null;
  }
}
