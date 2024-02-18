import { Component, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() color = 'primary';
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter();
  @Input() type = 'stroked';

  onClick() {
    this.buttonClick.emit();
  }

}
