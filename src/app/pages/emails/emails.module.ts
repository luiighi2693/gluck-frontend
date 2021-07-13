import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {EmailsComponent} from './emails.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TextEditorComponent } from './text-editor/text-editor.component';

@NgModule({
  declarations: [EmailsComponent, TextEditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RichTextEditorAllModule,
    DialogModule,
    RouterModule.forChild([{path: '', component: EmailsComponent}])
  ]
})
export class EmailsModule { }
