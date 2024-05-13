import { pdfjs } from "react-pdf";

// Path to the pdf.worker.js file
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const pdfToText = async (file, setProgress) => {
  try {
    if (!file) {
      throw new Error("No file provided.");
    }

    const blobUrl = URL.createObjectURL(file);
    const loadingTask = pdfjs.getDocument(blobUrl);

    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    const extractedTextByPage = [];

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      extractedTextByPage.push(pageText);

      const progress = (pageNumber / numPages) * 100;
      setProgress && setProgress(progress);
    }

    URL.revokeObjectURL(blobUrl);
    return extractedTextByPage;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return [];
  }
};

export default pdfToText;
