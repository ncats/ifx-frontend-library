import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  input,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { DialogModalComponent } from 'dialog-modal';
import { DndFileUploadComponent } from 'dnd-file-upload';
import { QuestionBase, TextboxQuestion } from 'ifx-form-question';
import { FormSubsection } from 'ramp';
import { RampCorePageComponent } from 'ramp-core-page';
import { IdentifierHarmonizationActions, RampSelectors } from 'ramp-store';
import { from } from 'rxjs';

class ManifestRow {
  FileNames!: string;
  ShortFileName!: string;
  HMDB!: string;
  Metabolite_Name!: string;
  PubChem_CID?: string;
  KEGG?: string;
  LIPIDMAPS?: string;
  chebi?: string;
}

class ManifestQuestionsService {
  getQuestions() {
    return [
      new TextboxQuestion({
        label: 'File Name',
        key: 'FileNames',
        disabled: true,
      }),
      new TextboxQuestion({
        label: 'Short File Name',
        key: 'ShortFileName',
      }),
      new TextboxQuestion({
        label: 'HMDB',
        key: 'HMDB',
      }),
      new TextboxQuestion({
        label: 'Metabolite Name',
        key: 'Metabolite_Name',
      }),
      new TextboxQuestion({
        label: 'Pubchem CID',
        key: 'PubChem_CID',
      }),
      new TextboxQuestion({
        label: 'KEGG',
        key: 'KEGG',
      }),
      new TextboxQuestion({
        label: 'LIPIDMAPS',
        key: 'LIPIDMAPS',
      }),
      new TextboxQuestion({
        label: 'Chebi',
        key: 'chebi',
      }),
    ];
  }
}

@Component({
  selector: 'lib-metlinkr-page',
  imports: [
    CommonModule,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    MatIcon,
    FormsModule,
    MatButton,
    DndFileUploadComponent,
  ],
  templateUrl: './metlinkr-page.component.html',
  styleUrl: './metlinkr-page.component.scss',
  standalone: true,
})
export class MetlinkrPageComponent
  extends RampCorePageComponent
  implements OnInit
{
  manifestFormService = new ManifestQuestionsService();
  fileUpload = viewChild(ElementRef);
  fileSelect = output<File | null>();
  files = signal<File[]>([]);
  manifestFile = signal<File | undefined>(undefined);
  formMap = new Map<string, FormGroup>();
  multiple = input<boolean | undefined>(false);
  fileLoading = signal<boolean>(false);
  ManifestFormMap = signal<Map<string, FormSubsection>>(
    new Map<string, FormSubsection>(),
  );
  displayedColumns: string[] = [
    'FileNames',
    'ShortFileName',
    'HMDB',
    'Metabolite_Name',
    'PubChem_CID',
    'KEGG',
    'LIPIDMAPS',
    'chebi',
  ];

  constructor() {
    super();
  }

  ngOnInit() {
    this.store.select(RampSelectors.getMetlinkrStatus).subscribe((res) => {
      if (res == true) {
        this.dialog.closeAll();
        this.dialog.open(DialogModalComponent, {
          data: {
            title: 'Mapping Complete',
            message: 'Output file downloaded.',
          },
        });
      }
    });
  }

  setForm($event: FormGroup, key: string) {
    this.formMap.set(key, $event);
  }

  setInputFiles(event: File[]) {
    this.files.set(event);
    /* if (!this.manifestFile()) {
      this._createManifestForm();
    }*/
  }

  setManifestFile(event: File[]) {
    this.manifestFile.set(event[0]);
    this._manifestToJson();
  }

  submit() {
    /*    const manifest = Array.from(this.formMap.values()).map((form) => {
      return form.getRawValue() as ManifestRow;
    });
    if (manifest.length !== this.files().length) {
      const manifestNames = manifest.map((file) => file.FileNames);
      const fileNames = this.files().map((file) => file.name);
      if (manifestNames.length > fileNames.length) {
        this.dialog.open(DialogModalComponent, {
          data: {
            title: 'Warning',
            message: `The number of files in the manifest list is greater than the number of files uploaded.
          Missing:`,
            htmlString: this._makeHTMLString(
              manifestNames.filter((name) => !fileNames.includes(name)),
            ),
          },
        });
      } else {
        this.submitData();
      }
      if (fileNames.length > manifestNames.length) {
        this.dialog.open(DialogModalComponent, {
          data: {
            title: 'Warning',
            message:
              'The number of files uploaded is greater than the number of files in the manifest list.',
            htmlString: this._makeHTMLString(
              fileNames.filter((name) => !manifestNames.includes(name)),
            ),
          },
        });
      }
    } else {*/
    this.submitData();
    // }
  }

  private _createManifestForm() {
    const inputMap: Map<string, FormSubsection> = new Map<
      string,
      FormSubsection
    >();
    const filesArr = Array.from(this.files());
    filesArr.forEach((file) => {
      const questions: QuestionBase<string>[] = this._mapFileToSubform(file);
      inputMap.set(file.name, { section: file.name, questions: questions });
    });
    this.ManifestFormMap.set(inputMap);
  }

  _toCSV(data: ManifestRow[]): string {
    const lines: string[] = [];
    data.forEach((input) => {
      const inputLine: string[] = [];
      this.displayedColumns.forEach((field) => {
        inputLine.push(
          input[field as keyof typeof input]
            ? <string>input[field as keyof typeof input]?.trim()
            : 'NA',
        );
      });
      lines.push(inputLine.join(','));
    });
    return this.displayedColumns.join(',') + '\n' + lines.join('\n');
  }

  _downloadFile() {
    if (this.dom && this.manifestFile()) {
      const link = this.dom.createElement('a');
      if (link.download !== undefined) {
        const manifest = Array.from(this.formMap.values()).map((form) => {
          return form.getRawValue() as ManifestRow;
        });
        const data = this._toCSV(manifest);
        const url = URL.createObjectURL(
          new File([data], 'manifest.csv', { type: 'text/csv' }),
        );
        link.setAttribute('href', url);
        link.setAttribute('download', `manifest.csv`);
        link.style.visibility = 'hidden';
        this.dom.body.appendChild(link);
        link.click();
        this.dom.body.removeChild(link);
      }
    }
  }

  private _mapFileToSubform(file: File) {
    const mappedSubform: QuestionBase<string>[] = [];
    this.manifestFormService.getQuestions().forEach((question) => {
      question.width = 10;
      if (question.key === 'FileNames') {
        question.value = file.name;
        question.width = 15;
      }
      if (question.key === 'ShortFileName') {
        question.value = file.name.split('.')[0];
      }
      mappedSubform.push(question);
    });
    return mappedSubform;
  }

  private _manifestToJson() {
    const inputMap: Map<string, FormSubsection> = new Map<
      string,
      FormSubsection
    >();
    const fileContents = from(this.manifestFile()!.text());
    fileContents.subscribe((text) => {
      const lines = text.split('\r\n');
      const fields = lines.shift()!.split(',');
      lines.forEach((line) => {
        const questions = this.manifestFormService.getQuestions();
        const lineSplit = line.split(',');
        const fileName = lineSplit[0];
        fields.forEach((field, index) => {
          questions.forEach((question) => {
            if (question.key === field) {
              question.value = lineSplit[index].trim();
            }
          });
        });
        inputMap.set(fileName, { section: fileName, questions: questions });
      });
      this.ManifestFormMap.set(inputMap);
    });
  }

  formMapToCSVFile() {
    const manifest = Array.from(this.formMap.values()).map((form) => {
      return form.getRawValue() as ManifestRow;
    });
    const data = this._toCSV(manifest);
    return new File([data], 'manifest.csv', { type: 'text/csv' });
  }

  private _makeHTMLString(values: string[]) {
    let string = `<div>`;
    values.forEach((value) => (string = string + '<div>' + value + '</div>'));
    string = string + '</div>';
    return this.sanitizer.bypassSecurityTrustHtml(string);
  }

  protected submitData() {
    this.store.dispatch(
      IdentifierHarmonizationActions.runIdentifierHarmonization({
        files: this.files() as File[],
        manifest: this.manifestFile() as File, //this.formMapToCSVFile(),
      }),
    );
    this.dialog.open(DialogModalComponent, {
      data: {
        title: 'Files submitted',
        message:
          'This may take a few minutes. Do not close or navigate away from this tab. The results will be downloaded when completed.',
      },
    });
  }
}
