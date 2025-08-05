const fs = require('fs');
const xlsx = require('xlsx');

let employersData = [];
try {
    // reading excel file
    const employers = xlsx.readFile('employers_data.xlsx');
    const sheetName = employers.SheetNames[0];
    const sheet = employers.Sheets[sheetName];
    employersData = xlsx.utils.sheet_to_json(sheet);

    // bonus clacul
    employersData.forEach(employer => {
        const salary = Number(employer['Salary'] || 0);
        let bonusPercentage = 0;
        if (salary < 50000) {
            bonusPercentage = 5;
        } else if (salary <= 100000) {
            bonusPercentage = 7;
        } else if (salary > 100000) {
            bonusPercentage = 10;
        }
        const bonusAmount = +(salary * bonusPercentage / 100).toFixed(2);

        employer['BonusPercentage'] = bonusPercentage;
        employer['BonusAmount'] = bonusAmount;
    });

    // json to sheet
    const newSheet = xlsx.utils.json_to_sheet(employersData);

    //new workbook 
    const newWorkbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(newWorkbook, newSheet, 'Employers');

    // write the updated workbook to new file
    xlsx.writeFile(newWorkbook, 'updated_employers_data.xlsx');
    console.log('Updated employers data saved to updated_employers_data.xlsx');

    // // Also write to JSON for reference
    // fs.writeFileSync('employers_data.json', JSON.stringify(employersData, null, 2));
    // console.log('Employers data saved to employers_data.json');
} catch (error) {
    console.error('Error processing employer data:', error.message);
}