import { Database, ref, set } from "firebase/database";
import { SavedPdf, UserProfile } from "../context/profile.types";

export const addOrUpdateSavedPdf = (
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
