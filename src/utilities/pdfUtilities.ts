import { Database, ref, set } from "firebase/database";
import { SavedPdf, UserProfile } from "../context/profile.types";

export const addSavedPdf = (
  database: Database,
  profile: UserProfile,
  newPdf: SavedPdf
) => {
  const existingPdfIndex = profile.savedPdfs.findIndex(
    (pdf) => pdf.title === newPdf.title
  );

  if (existingPdfIndex === -1) {
    // If PDF with the same title doesn't exist, add it to the array
    const updatedPdfs = [...profile.savedPdfs, newPdf];

    // Update the profile with the updated savedPdfs array in the database
    const updatedProfile = { ...profile, savedPdfs: updatedPdfs };
    set(ref(database, `users/${profile.uid}`), updatedProfile);

    return updatedProfile;
  }

  // If PDF with the same title already exists, return the original profile
  return profile;
};

export const updateSavedPdfSavedPage = (
  pdfTitle: string,
  newPdfPage: number,
  database: Database,
  profile: UserProfile
) => {
  const existingPdfIndex = profile.savedPdfs.findIndex(
    (pdf) => pdf.title === pdfTitle
  );

  if (existingPdfIndex >= 0) {
    const updatedPdfs = [...profile.savedPdfs];
    updatedPdfs[existingPdfIndex].savedPage = newPdfPage;
    updatedPdfs[existingPdfIndex].updateDate = new Date().toISOString();
    const updatedProfile = { ...profile, savedPdfs: updatedPdfs };
    set(ref(database, `users/${profile.uid}`), updatedProfile);

    return updatedProfile;
  } else {
    alert("Pdf is not existing in database.");
  }
  return profile;
};

export const deleteSavedPdf = (
  pdfTitle: string,
  database: Database,
  profile: UserProfile
) => {
  const existingPdfIndex = profile.savedPdfs.findIndex(
    (pdf) => pdf.title === pdfTitle
  );
  if (existingPdfIndex >= 0) {
    const updatedPdfs = [...profile.savedPdfs];
    updatedPdfs.splice(existingPdfIndex, 1);
    const updatedProfile = { ...profile, savedPdfs: updatedPdfs };
    set(ref(database, `users/${profile.uid}`), updatedProfile);

    return updatedProfile;
  } else {
    alert("Pdf is not existing in database.");
  }
  return profile;
};
