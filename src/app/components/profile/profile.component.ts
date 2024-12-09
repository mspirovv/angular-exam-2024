import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { profileDetails } from '../../types/user';
import { UserService } from '../../services/user.service';
import { Product, ProductResponse } from '../../types/product';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  isEditMode : boolean = false;
  products: Product[] = []; 

  profileDetails : profileDetails = {
    username: '',
    email: '',
  }

  form = new FormGroup({
  username: new FormControl('', [Validators.required,Validators.minLength(5)]),
  email: new FormControl('',[Validators.required,emailValidator(DOMAINS)]),
  password: new FormControl('', [Validators.minLength(6)]),

  })

  constructor (private userService : UserService, private apiService: ApiService) {}

  ngOnInit(): void {
    const { username, email } = this.userService.user!;
    this.profileDetails = { username, email};


    this.form.setValue({
        username,
        email,
        password: '' ,

    });
    console.log('Calling loadUserProducts'); // Добави за дебъгване

    this.loadUserProducts();

}

loadUserProducts(): void {
  console.log('Sending request to fetch products');
  this.apiService.getUserProducts().subscribe(
    (response: ProductResponse) => { 
      console.log('Loaded products:', response);
      this.products = response.products;  
    },
    (error) => {
      console.error('Error loading products:', error);
    }
  );
}



  toggleEditMode () {
    this.isEditMode = !this.isEditMode
  }

  handleSave() {
    if (this.form.invalid){
      return;
    }

  this.profileDetails = this.form.value as profileDetails


  const {username,email,password} = this.profileDetails;
  this.userService.updateProfile(username,email,password).subscribe(() => {
    this.toggleEditMode();
  })
  }
  
  onCancel(event: Event){
    event.preventDefault();
    this.isEditMode = !this.isEditMode

  }
}
