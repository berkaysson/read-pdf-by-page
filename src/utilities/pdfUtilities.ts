import { Database, ref, set } from "firebase/database";
import { SavedPdf, UserProfile } from "../context/profile.types";
import {
  StorageReference,
  getDownloadURL,
  uploadBytesResumable,
  ref as storageRef,
  FirebaseStorage,
  UploadTaskSnapshot,
  deleteObject,
} from "firebase/storage";

export const addSavedPdf = async (
  database: Database,
  profile: UserProfile,
  newPdf: SavedPdf,
  file: File,
  storage: FirebaseStorage
) => {
  const existingPdfIndex = profile.savedPdfs.findIndex(
    (pdf) => pdf.title === newPdf.title
  );

  if (existingPdfIndex === -1) {
    let downloadURL = await uploadPdf(profile.uid, file, storage);
    newPdf.downloadURL = downloadURL;
    const updatedPdfs = [...profile.savedPdfs, newPdf];

    // Update the profile with the updated savedPdfs array in the database
    const updatedProfile = { ...profile, savedPdfs: updatedPdfs };
    set(ref(database, `users/${profile.uid}`), updatedProfile);

    return updatedProfile;
  }
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

export const deleteSavedPdf = async (
  pdf: SavedPdf,
  database: Database,
  profile: UserProfile,
  storage: FirebaseStorage
) => {
  const existingPdfIndex = profile.savedPdfs.findIndex(
    (_pdf) => _pdf.title === pdf.title
  );
  if (existingPdfIndex >= 0) {
    const updatedPdfs = [...profile.savedPdfs];
    updatedPdfs.splice(existingPdfIndex, 1);
    const updatedProfile = { ...profile, savedPdfs: updatedPdfs };
    set(ref(database, `users/${profile.uid}`), updatedProfile);

    const path = `files/${profile.uid}/${pdf.title}`;
    await deleteObject(storageRef(storage, path));
    return updatedProfile;
  } else {
    alert("Pdf is not existing in database.");
  }
  return profile;
};

const uploadPdf = async (
  userId: string | null,
  file: File | null,
  storage: FirebaseStorage
): Promise<string> => {
  if (userId === null) {
    throw new Error("userId is null");
  }
  if (file === null) {
    throw new Error("file is null");
  }

  const _storageRef: StorageReference = storageRef(
    storage,
    `files/${userId}/${file.name}`
  );

  const uploadTask = uploadBytesResumable(_storageRef, file);

  try {
    // Retrieve the progress percentage of the upload
    const progressListener = (snapshot: UploadTaskSnapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    };

    // Register the progress listener
    uploadTask.on(
      "state_changed",
      progressListener,
      (error) => {
        throw error;
      },
      () => {}
    );

    // Wait for the upload to complete
    await uploadTask;

    // Retrieve the download URL
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw new Error("Failed to upload PDF: " + error);
  }
};
