import { Dropzone, FileItem } from "@dropzone-ui/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
} from "@mui/material";
import * as React from "react";
import * as XLSX from "xlsx";
const CABECERAS = ["DENOMINACION", "MONTO", "ES_INGRESO"];
const ImportarDialog = (props) => {
  const { open, onClose, onSave } = props;
  const [files, setFiles] = React.useState([]);
  const [valorFinal, setValorFinal] = React.useState([]);
  const handleClose = () => {
    onClose?.();
  };
  const handleSave = () => {
    onSave?.(valorFinal);
  };
  const handleChangeFiles = (newFiles) => {
    setFiles(newFiles);
    if (newFiles.length > 0) {
      console.log(newFiles[0]);
    }
  };
  const handleDeleteFile = (id) => {
    const newArrFiles = files.filter((file) => file.id !== id);
    setFiles(newArrFiles);
  };
  const readFileasText = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
      } else {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsText(file);
        } catch (error) {
          resolve("");
        }
      }
    });
  };
  const readCSV = async (file) => {
    const respuesta = await readFileasText(file);
    const splittedResponse = respuesta.split("\n");
    const cleanedResponse = splittedResponse
      .map((linea) => linea.split("\r")[0])
      .map((linea) => linea.split(","));
    console.log("Respuesta lectura CSV cleanedResponse", cleanedResponse);
    console.log("Respuesta lectura CSV cleanedResponse[0]", cleanedResponse[0]);
    let resultadoEnArrayDeObjetos = [];
    if (cleanedResponse[0].length === CABECERAS.length) {
      let iguales = true;
      for (let i = 0; i < CABECERAS.length > 0; i++) {
        if (cleanedResponse[0][i] !== CABECERAS[i]) {
          iguales = false;
          break;
        }
      }
      if (iguales) {
        //cabeceras
        const cabecerasArray = cleanedResponse[0];
        for (let i = 1; i < cleanedResponse.length; i++) {
          const currentElement = cleanedResponse[i];
          let currObject = {};
          // j => 0, 1, 2
          /*  for (let j = 0; j < cabecerasArray.length; j++) {
            currObject[cabecerasArray[j]] = currentElement[j];
          } */
          //string
          currObject.descripcion = currentElement[0];
          //number
          currObject["monto"] = +currentElement[1];
          //boolean
          currObject.esIngreso = currentElement[2] === "1";
          resultadoEnArrayDeObjetos.push(currObject);
        }

        //resultadoEnArrayDeObjetos
      } else {
        alert("Las cabeceras no coinciden: " + CABECERAS.join(","));
      }
    } else {
      alert("Las cabeceras no tienen la misma longitud");
    }
    console.log("CSV DATA", resultadoEnArrayDeObjetos);
    setValorFinal([...valorFinal, ...resultadoEnArrayDeObjetos]);
  };
  const readFileasBuffer = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(undefined);
      } else {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsArrayBuffer(file);
        } catch (error) {
          resolve(undefined);
        }
      }
    });
  };
  const readXLSX = async (file) => {
    const resultXlsxRead = await readFileasBuffer(file);
    const libro = XLSX.read(resultXlsxRead, { type: "buffer" });
    const nombreLibro = libro.SheetNames[0];
    const hoja = libro.Sheets[nombreLibro];
    const datos = XLSX.utils.sheet_to_json(hoja);
    // console.log("XLSX data", datos);
    const datosRefactor = datos.map((x) => {
      return {
        descripcion: x.DENOMINACION,
        monto: x.MONTO,
        esIngreso: x.ES_INGRESO===1,
      };
    });
    console.log("XLSX DATA", datosRefactor);
    //
    setValorFinal([...valorFinal, ...datosRefactor]);
  };
  React.useEffect(() => {
    console.log("val final", valorFinal);
  }, [valorFinal]);
  const readFiles=async(files)=>{
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const currentFile = files[i];
        const extencion = currentFile.file.name.split(".")[1];
        if (extencion === "xlsx") {
          await readXLSX(currentFile.file);
        } else {
          await readCSV(currentFile.file);
        }
      }
    }
  }
  React.useEffect(() => {
    readFiles(files);
    /* 
      readCSV(files[0].file);
    } */
  }, [files]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Nueva transacción"}</DialogTitle>
      <DialogContent>
        <FormLabel id="demo-radio-buttons-group-label">
          Selecciones un archivo para importar las transacciones
        </FormLabel>

        <Dropzone
          onChange={handleChangeFiles}
          value={files}
          accept=".csv, .xlsx"
          maxFiles={2}
          maxFileSize={10 * 1024 * 1024}
          disableScroll
          localization="ES-es"
          style={{ minHeight: "200px", marginTop: "15px" }}
        >
          {files.map((file, index) => (
            <FileItem
              {...file}
              key={file.id}
              info
              resultOnTooltip
              localization="ES-es"
              onDelete={handleDeleteFile}
            />
          ))}
        </Dropzone>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          autoFocus
          variant="contained"
          color="secondary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ImportarDialog;
