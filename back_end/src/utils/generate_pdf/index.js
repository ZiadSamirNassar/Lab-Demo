const puppeteer = require('puppeteer')

function generateReport({patient, testType, fields, createdAt}) {

  const head =`

    <head>
        <meta charset="UTF-8" />
        <title>تقرير تحليل البول</title>
        <style>
            * {
                margin: 0;
                padding: 0;
            }

            body {
                font-family: Arial, sans-serif;
                direction: ltr;
            }

            .content {
                width: 95%;
                display: flex;
                font-family: Arial, sans-serif;
                direction: ltr;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                margin: 60px auto;
            }

            .header,
            .footer {
                background-color: #f4cb00;
                height: 40px;
            }

            .header {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
            }

            .footer {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
            }

            .lab-name {
                font-weight: bolder;
                font-size: 35px;
                text-align: center;
                width: 100%;
            }

            .br {
                height: 3px;
                margin: 10px 0;
                background-color: #000000;
                width: 100%;
            }

            .section-title {
                background-color: #f4cb00;
                width: 100%;
                border: 3px solid #000000;
                border-radius: 6px;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                text-transform: uppercase;
                padding: 10px;
                margin: 20px 0px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }


            th,
            td {
                border: 1px solid #444;
                padding: 8px;
                text-align: center;
            }

            th {
                background-color: #eee;
            }


            .info-table td {
                border: none;
            }

            .signature {
                margin-top: 40px;
                text-align: right;
                font-weight: bold;
            }

            .highlight {
                color: red;
            }
        </style>
    </head>
`

let patientInfo = `

    <table class="info-table">
        <tr>
            <td><strong>Patient Name:</strong> ${patient.name}</td>
            <td><strong>Registered:</strong> ${createdAt.split('T')[0]} ${createdAt.split('T')[1].split('.')[0]}</td>
        </tr>
        <tr>
            <td><strong>Age:</strong> ${patient.age}</td>
            <td><strong>Collected:</strong>${createdAt.split('T')[0]} ${createdAt.split('T')[1].split('.')[0]}</td>
        </tr>
        <tr>
            <td><strong>Sex:</strong> ${patient.gender}</td>
            <td><strong>Printed:</strong> ${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}</td>
        </tr>
    </table>
    <div class="br"></div>
`

let testResultInfo = `

    <div class="section-title">${testType.name}</div>

    <table>
        <tr>
            <th>Test Name</th>
            <th>Result</th>
            <th>Unit</th>
            <th>Reference</th>
        </tr>

        ${fields.map(field => {
            return `
            <tr>
                <td>${field.label}</td>
                <td>${field.result}</td>
                <td>${field.unit}</td>
                <td>${field.normal}</td>
            </tr>
            `
        })}
    </table>
    <div class="br"></div>
`

let body =`

    <body>
    <div class="header"></div>

    <div class="content">

        <div class="lab-name">Acuret lab</div>
        <div class="br"></div>

        <div class="patient-info" style="width: 100%;">
            ${patientInfo}
        </div>

        <div class="patient-result" style="width: 95%; margin: auto;">
            ${testResultInfo}
        </div>

    </div>

    <div class="footer"></div>
    </body>
`

  return `
  <!DOCTYPE html>
  <html lang="en">
    ${head}
    ${body}
  </html>
`
}


async function generatePDF(report) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    const htmlContent = generateReport(report);
  
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
    await page.pdf({
      path: 'output.pdf',
      format: 'A4',
      printBackground: true,
    });
  
    await browser.close();
    console.log('✅ PDF Generated!');
  }

 module.exports = generatePDF;