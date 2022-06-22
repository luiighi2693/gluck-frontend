import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent, CountService} from '@syncfusion/ej2-angular-richtexteditor';
import { createElement, addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import CodeMirror from 'codemirror';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, CountService],
  styleUrls: ['./text-editor.component.css', ]
})
export class TextEditorComponent implements AfterViewInit {
  @ViewChild('toolsRTE') public rteObj: RichTextEditorComponent;
  public tools: object = {
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
      'Outdent', 'Indent', '|',
      'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
      'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
  };
  public maxLength = 1000;
  public textArea: HTMLElement;
  public myCodeMirror: any;
  ngAfterViewInit(): void {
    const rteObj: RichTextEditorComponent = this.rteObj;
    setTimeout(() => { this.textArea = rteObj.contentModule.getEditPanel() as HTMLElement; }, 600);
  }
  public mirrorConversion(e?: any): void {
    const id: string = this.rteObj.getID() + 'mirror-view';
    let mirrorView: HTMLElement = this.rteObj.element.querySelector('#' + id) as HTMLElement;
    const charCount: HTMLElement = this.rteObj.element.querySelector('.e-rte-character-count') as HTMLElement;
    if (e.targetItem === 'Preview') {
      this.textArea.style.display = 'block';
      mirrorView.style.display = 'none';
      this.textArea.innerHTML = this.myCodeMirror.getValue();
      charCount.style.display = 'block';
    } else {
      if (!mirrorView) {
        mirrorView = createElement('div', { className: 'e-content' });
        mirrorView.id = id;
        this.textArea.parentNode.appendChild(mirrorView);
      } else {
        mirrorView.innerHTML = '';
      }
      this.textArea.style.display = 'none';
      mirrorView.style.display = 'block';
      this.renderCodeMirror(mirrorView, this.rteObj.value);
      charCount.style.display = 'none';
    }
  }

  public renderCodeMirror(mirrorView: HTMLElement, content: string): void {
    this.myCodeMirror = CodeMirror(mirrorView, {
      value: content,
      lineNumbers: true,
      mode: 'text/html',
      lineWrapping: true,

    });
  }
  public actionCompleteHandler(e: any): void {
    if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
      (this.rteObj.sourceCodeModule.getPanel() as HTMLTextAreaElement).style.display = 'none';
      this.mirrorConversion(e);
    } else {
      setTimeout(() => { this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
    }
  }
}
