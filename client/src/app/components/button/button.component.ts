import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, NgIf, RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = 'Add Text...';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() variant: 'bordered' | 'ghost' | 'solid' = 'solid';
  @Input() hover: boolean = true;
  @Input() border: boolean = false;
  @Input() routerLink: string | null = null;

  getClasses(): string {
    const base = 'px-5 py-2 font-medium rounded transition';

    const colorClasses = {
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-gray-200 text-black',
    };

    const hoverClasses = {
      primary: 'hover:bg-blue-700',
      secondary: 'hover:bg-gray-300',
    };

    const selectedColor = colorClasses[this.color];
    const hoverEffect = this.hover ? hoverClasses[this.color] : '';
    const borderStyle = this.border ? 'border border-black' : '';

    return `${base} ${selectedColor} ${hoverEffect} ${borderStyle}`;
  }
}
