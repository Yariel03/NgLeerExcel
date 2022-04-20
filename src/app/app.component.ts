import { Lexer } from '@angular/compiler';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LeerExcel';
  data: any[] = [];

  validateFormat = (jsonExcel: any) => {
    jsonExcel.map((row: any) => {
      if (row.length > 0) {
        throw new Error('El formato del archivo no es correcto');
      }
    });
  };

  leerExcel = (reader: any, file: any): any => {
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' }); // comment:lista de las hojas excel
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name]; // comment:seleccionar la primera hoja del excel para leerla
      const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true }); // comment:convertir la hoja excel a un json
      console.log(
        '🚀 ~ file: app.component.ts ~ line 22 ~ AppComponent ~ excelData',
        excelData
      );
      this.data = excelData;
      this.validateFormat(excelData);
    };
    reader.readAsBinaryString(file); //Ejecuta todo para poder leer el archivo
  };

  UploadExcel = async (event: any) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    const reader = new FileReader();
    await this.leerExcel(reader, file).then(() => {
      console.log(
        '🚀 ~ file: app.component.ts ~ line 36 ~ AppComponent ~ this.data',
        this.data
      );
    });
    // console.log(this.data);
  };
}
