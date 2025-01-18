# CertifyMe
The aim of this project is to provide a software for institutions, clubs or communities to issue specially prepared certificates to the participants after the event or organization they have organized easily without any sponsor support or any budget, to send the certificate directly to those people and to provide certificate verification processes directly.

## Getting Started

### Build It Yourself

Requirements:
- [Node.js v22.13.0](https://nodejs.org)
- [ExelJS](https://www.npmjs.com/package/exceljs)
- [PDFKit](https://www.npmjs.com/package/pdfkit) 
- [Sharp](https://www.npmjs.com/package/sharp) 

Steps:
1) Clone this repository:<pre><code>git clone https://github.com/Malik-124-UGUR/CertifyMe.git</code></pre>
2) Run in the directory where the project is located: <pre><code>npm init -y</code></pre><pre><code>npm install exceljs</code></pre><pre><code>npm install pdfkit</code></pre><pre><code>npm install sharp</code></pre>
3) Make sure you have installed the project correctly:<pre><code>node .\create_certificate.js</code></pre>

## Features
Specify the path to an example design file with a `certificateImagePath = 'example.png';.` 
Then set a path to an exel file with `await workbook.xlsx.readFile('example_people.xlsx');` (Make sure there are two data here for now => first name and last name).  

`// Calculate the x and y coordinates for the text placement
    const x = (imageWidth - textWidth) / 2; 
    const y = (imageHeight / 2) - (textHeight / 2) - 50;`

For now, you can print the data wherever you want by playing with the x and y values in the code section you see above. 
(The default values target the exact midpoint on the x-axis and 50 pixels above the midpoint on the y-axis).
