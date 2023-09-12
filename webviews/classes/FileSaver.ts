let fs = require('fs');
class FileSaver {
    private textoAGuardar: string;
    private rutaArchivo: string;

    constructor(textoAGuardar: string, rutaArchivo: string) {
      this.textoAGuardar = textoAGuardar;
      this.rutaArchivo = rutaArchivo;
    }

    guardarTextoEnArchivo() {
      fs.writeFile(this.rutaArchivo, this.textoAGuardar, (err: any) => {
        if (err) {
          console.error('Error al guardar el texto:', err);
        } else {
          console.log('Texto guardado correctamente.');
        }
      });
    }
  }

//   // Create an instance of the FileSaver class and use it to save text to a file
//   const fileSaver = new FileSaver(
//     'Este es el texto que quiero guardar en un archivo.',
//     'ruta/del/archivo.txt'
//   );
//   fileSaver.guardarTextoEnArchivo();
export default FileSaver;