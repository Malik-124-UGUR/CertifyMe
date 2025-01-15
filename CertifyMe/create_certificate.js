const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const sharp = require('sharp');

// Certificate template image path
const certificateImagePath = 'example.png';
const fontPath = 'fonts/Roboto_Bold.ttf';
let imageWidth = 0;
let imageHeight = 0;

// Get image dimensions
sharp(certificateImagePath)
    .metadata()  // Get image metadata
    .then(info => {
        imageWidth = info.width;
        imageHeight = info.height;
    })
    .catch(err => {
        console.error('Error processing the image:', err);
    });

// Read Excel file and generate certificates for each person
async function createCertificates() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('example_people.xlsx');
    const worksheet = workbook.worksheets[0];

    worksheet.eachRow((row, rowNumber) => {

        // Get Name and Surname from the row
        const name = row.getCell(1).value;   // 1st column (Name)
        const surname = row.getCell(2).value; // 2nd column (Surname)

        // Create the certificate PDF
        const doc = new PDFDocument({ size: [imageWidth, imageHeight] });

        // Output file name
        const outputPath = `certificates/${name}_${surname}_certificate.pdf`;
        doc.pipe(fs.createWriteStream(outputPath));

        // Add the certificate template (image) to the PDF
        doc.image(certificateImagePath, 0, 0); // Add the image to the PDF
        
        const fontSize = 60;
        doc.font(fontPath) // Set the font file
            .fontSize(fontSize)
            .fillColor('black');
        
        // Center the text
        const text = `${name} ${surname}`;
        const textWidth = doc.widthOfString(text); // Get the text width
        const textHeight = doc.heightOfString(text); // Get the text height (based on font size)

        // Calculate the x and y coordinates for the text placement
        const x = (imageWidth - textWidth) / 2; 
        const y = (imageHeight / 2) - (textHeight / 2);
        
        doc.text(`${text}`, x, y - 50); // Place the text on the certificate
        
        // Finish the PDF document
        doc.end();
    });
}

createCertificates().catch(err => console.error(err));
