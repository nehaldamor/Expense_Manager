const cron = require("node-cron");
const Company = require("../models/Company");
const User = require("../models/User");
const Expense = require("../models/Expense");
const generatePDF = require("../utils/generatePDF");
const sendEmail = require("../utils/sendEmail");

cron.schedule("0 10 * * *" ,async () => {
 

  const companies = await Company.find();
  

  for (let company of companies) {
  

    const expenses = await Expense.find({ companyId: company._id });
    

    if (expenses.length === 0) {
      
      continue;
    }

    const pdfPath = generatePDF(company.name, expenses);
   

    const users = await User.find({ companyId: company._id });
 

    for (let user of users) {
      

      await sendEmail(
        user.email,
        "Daily Expense Report",
        "Please find attached expense report.",
        [
          {
            filename: "report.pdf",
            path: pdfPath
          }
        ]
      );
    }
  }
});
