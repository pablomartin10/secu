const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const form = req.params.form;
    const dir = `uploads/${form}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); // Carpeta con nombre del formulario
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con fecha y extensión
  }
});

const upload = multer({ storage: storage });

// Ruta principal (landing page)
app.use(express.static('public'));

// Ruta para los formularios específicos
app.get('/form1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form1.html'));
});
app.get('/form2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form2.html'));
});
app.get('/form3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form3.html'));
});
app.get('/form4', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form4.html'));
});
app.get('/form5', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form5.html'));
});
app.get('/form6', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form6.html'));
});

// Función para ejecutar el script de Python y subir el archivo a SharePoint
function uploadFileToSharePoint(filePath) {
  const pythonScriptPath = path.join(__dirname, 'upload_to_sharepoint.py');
  const command = `python3 ${pythonScriptPath} ${filePath}`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el script de Python: ${error}`);
      return;
    }
    console.log(`Resultado del script: ${stdout}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  });
}

// Rutas para subir archivos y ejecutar el script de Python
app.post('/uploadForm1', upload.single('file'), (req, res) => {
  if (req.file) {
    uploadFileToSharePoint(req.file.path);  // Llama al script de Python para subir el archivo
    res.send('Archivo subido correctamente a Formulario 1: ' + req.file.filename);
  } else {
    res.send('Error al subir el archivo.');
  }
});

app.post('/uploadForm2', upload.single('file'), (req, res) => {
  if (req.file) {
    uploadFileToSharePoint(req.file.path);  // Llama al script de Python para subir el archivo
    res.send('Archivo subido correctamente a Formulario 2: ' + req.file.filename);
  } else {
    res.send('Error al subir el archivo.');
  }
});

app.post('/uploadForm3', upload.single('file'), (req, res) => {
  if (req.file) {
    uploadFileToSharePoint(req.file.path);  // Llama al script de Python para subir el archivo
    res.send('Archivo subido correctamente a Formulario 3: ' + req.file.filename);
  } else {
    res.send('Error al subir el archivo.');
  }
});

app.post('/uploadForm4', upload.single('file'), (req, res) => {
  if (req.file) {
    uploadFileToSharePoint(req.file.path);  // Llama al script de Python para subir el archivo
    res.send('Archivo subido correctamente a Formulario 4: ' + req.file.filename);
  } else {
    res.send('Error al subir el archivo.');
  }
});

app.post('/uploadForm5', upload.single('file'), (req, res) => {
  if (req.file) {
    uploadFileToSharePoint(req.file.path);  // Llama al script de Python para subir el archivo
    res.send('Archivo subido correctamente a Formulario 5: ' + req.file.filename);
  } else {
    res.send('Error al subir el archivo.');
  }
});

app.post('/uploadForm6', upload.single('file'), (req, res) => {
  if (req.file) {
    uploadFileToSharePoint(req.file.path);  // Llama al script de Python para subir el archivo
    res.send('Archivo subido correctamente a Formulario 6: ' + req.file.filename);
  } else {
    res.send('Error al subir el archivo.');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
