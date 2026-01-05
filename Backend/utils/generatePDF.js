const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = (companyName, expenses) => {
  const reportsDir = path.join(__dirname, "../reports");

  // ensure folder exists
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const filePath = path.join(
    reportsDir,
    `${companyName.replace(/\s+/g, "_")}_report.pdf`
  );

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  doc.fontSize(18).text("Daily Expense Report", { align: "center" });
  doc.moveDown();

  expenses.forEach((e, i) => {
    doc
      .fontSize(12)
      .text(`${i + 1}. ${e.title} | ${e.category} | ₹${e.amount}`);
  });

  doc.end();

  console.log("📄 PDF created:", filePath);

  return filePath;
};
