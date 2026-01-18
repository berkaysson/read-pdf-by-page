export const validateFile = (file: File, profile: any, toast: any): boolean => {
  const isException = profile?.email === "berkaysonel85@gmail.com";
  const pdfCount = profile?.savedPdfs?.length || 0;

  if (pdfCount >= 5 && !isException) {
    toast({
      title: "Limit Reached",
      description:
        "You have reached the limit of 5 PDFs. Please delete some to upload more.",
      variant: "destructive",
    });
    return false;
  }

  if (file.size > 10 * 1024 * 1024) {
    toast({
      title: "File too large",
      description: "Please select a file smaller than 10MB.",
      variant: "destructive",
    });
    return false;
  }

  if (file.type !== "application/pdf") {
    toast({
      title: "Invalid file type",
      description: "Please upload a PDF file.",
      variant: "destructive",
    });
    return false;
  }

  return true;
};
