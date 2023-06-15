import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent {
  colorBar1 = 'gray';
  colorBar2 = 'gray';
  colorBar3 = 'gray';

  constructor(private sanitizer: DomSanitizer) { }


  onPasswordInput(event: Event) {
    let password = (event.target as HTMLInputElement).value;
    password = this.sanitizer.sanitize(SecurityContext.NONE, password) || "";

    if (password.length < 8) {
      this.colorBar1 = 'red';
      this.colorBar2 = 'red';
      this.colorBar3 = 'red';
      return;
    }

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /\W/.test(password);

    const easyPassword = hasLetters || hasNumbers || hasSymbols;
    const mediumPassword = (hasLetters && hasNumbers) || (hasLetters && hasSymbols) || (hasNumbers && hasSymbols);
    const strongPassword = hasLetters && hasNumbers && hasSymbols;

    if(strongPassword) {
      this.colorBar1 = 'green';
      this.colorBar2 = 'green';
      this.colorBar3 = 'green';
    } else if(mediumPassword){
      this.colorBar1 = 'yellow';
      this.colorBar2 = 'yellow';
      this.colorBar3 = 'gray';
    } else if (easyPassword){
      this.colorBar1 = 'red';
      this.colorBar2 = 'grey';
      this.colorBar3 = 'gray';
    }
  }

}
