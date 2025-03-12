import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';  // Import MatTableDataSource
import { MatPaginator } from '@angular/material/paginator';    // Import MatPaginator
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/storage.service';


interface UserManualData {
  ID?: number;
  Category?: string;
  DocumentType?: string;
  CreateDate?: string;
  LastModified?: string;
  Title?: string;
  Description?: string;
  ModelCode?: string;
  FileDownloadID?: number;
  FileName?: string;
  PublicationNo?: string;
}

@Component({
  selector: 'usermanualdownload',
  templateUrl: './usermanualdownload.component.html',
  styleUrls: ['./usermanualdownload.component.scss']
})
export class usermanualdownloadComponent implements OnInit {
  displayedColumns: string[] = ['category', 'docType', 'createdDate', 'modifiedDate', 'title', 'desc',
    'modelCode', 'file', 'pubno', 'download'];  // Columns to display in the table
  dataSource = new MatTableDataSource<UserManualData>();        // Data source for the table
  public receivedData: string = '';
  attachmentsinvoicefileName1URL: string = '';
  public isLoading: boolean = false;
  public linkSource: any;
  title = 'Zona Propietarios - YAMAHA';
  constructor(private storageService: StorageService, private authService: AuthService, private _formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;  // ViewChild to access paginator


  ngOnInit(): void {
    if (this.storageService.getItem('LSEngineNo') == null)
      this.router.navigate(['/']);

    this.receivedData = this.storageService.getItem('LSEngineNo') || '';
    this.setDataSource();
  }

  download(base64String: any, typeOfData: any) {
    return `data:` + typeOfData + `;base64,${base64String}`;
  }

  async setDataSource() {
    await this.authService.getUserManual(this.receivedData)
      .then((data) => {
        console.log(data);
        if (data != null) {
          if (data.content.manualtList.length == 0) {
            this.toastr.warning('No se encontró ningún manual de usuario!!');
          } else {
            this.dataSource.data = data.content.manualtList;

          }
        }
      }, (error) => {
        this.toastr.error('algo salió mal!!');
      });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;  // Set paginator for the table
    }
  }
  logout() {
    this.router.navigate(['/']);
  }

  onClick(filename: string, id: number) {
    this.isLoading = true;
    this.showPdf(filename, id);
  }


  async showPdf(filename: string, id: number) {

    await this.authService.downloadUserManual(id)
      .then((data) => {

        if (data == null || data.statusCode != 200) {
          this.toastr.warning('No se encontró ningún registro!!');
          this.isLoading = false;
        } else {
          this.linkSource =
            `data:application/pdf;base64,${data.content.base64String}`;
          //this.isLoading = false;

        }


      }, (error) => {
        this.toastr.error('algo salió mal!!');
        this.isLoading = false;
      });

    const downloadLink = document.createElement('a');
    const fileName = filename;

    downloadLink.href = this.linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    setTimeout(() => { this.isLoading = false; }, 4000);
    
  }
}
