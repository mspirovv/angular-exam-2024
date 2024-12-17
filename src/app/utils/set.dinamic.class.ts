export function setEmailErrorClass(email: any): string {
    if (
      (email?.touched && email?.errors?.['required']) ||
      (email?.touched && email?.errors?.['emailValidator'])
    ) {
      return 'input-error';
    }
    return '';
  }
  
  export function setPasswordErrorClass(password: any): string {
    if (password?.touched && password?.errors?.['required']) {
      return 'input-error';
    }
    if (password?.touched && password?.errors?.['minlength']) {
      return 'input-error';
    }
    return '';
  }
  
  export function setRePasswordErrorClass(rePassword: any, error: any): string {
    if (rePassword?.touched && rePassword?.errors?.['required']) {
      return 'input-error';
    }
    if (rePassword?.touched && error) {
      return 'input-error';
    }
    return '';
  }
  
  export function setUsernameErrorClass(username: any): string {
    if (username?.touched && username?.errors?.['required']) {
      return 'input-error';
    }
    if (username?.touched && username?.errors?.['minlength']) {
      return 'input-error';
    }
    return '';
  }
  