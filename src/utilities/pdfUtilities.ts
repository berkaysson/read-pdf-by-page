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
  getBlob,
} from "firebase/storage";
import { Dispatch, SetStateAction } from "react";

export const addSavedPdf = async (
  database: Database,
  profile: UserProfile,
  newPdf: SavedPdf,
  file: File,
  storage: FirebaseStorage,
  setProgress: Dispatch<SetStateAction<number>>
) => {
  const existingPdfIndex = profile.savedPdfs.findIndex(
    (pdf) => pdf.title === newPdf.title
  );

  if (existingPdfIndex === -1) {
    let downloadURL = await uploadPdf(profile.uid, file, storage, setProgress);
    newPdf.downloadURL = downloadURL;
    const updatedPdfs = [...profile.savedPdfs, newPdf];
    setProgress(85);
    const updatedProfile = { ...profile, savedPdfs: updatedPdfs };
    setProgress(90);
    set(ref(database, `users/${profile.uid}`), updatedProfile);
    setProgress(99);
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

export const getPdfFromStorage = async (
  profile: UserProfile,
  pdf: SavedPdf,
  storage: FirebaseStorage
): Promise<File | null> => {
  if (!profile.uid) {
    return null;
  }
  const downloadUrl = `files/${profile.uid}/${pdf.title}`;
  const _storageRef = storageRef(storage, downloadUrl);
  try {
    const blobResponse = await getBlob(_storageRef);
    return new File([blobResponse], pdf.title, { type: blobResponse.type });
  } catch (error) {
    console.error("Error retrieving PDF from storage:", error);
    return null;
  }
};

const uploadPdf = async (
  userId: string | null,
  file: File | null,
  storage: FirebaseStorage,
  setProgress: Dispatch<SetStateAction<number>>
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
    // Register the progress listener
    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress * 0.8);
      },
      (error) => {
        throw error;
      },
      () => {}
    );

    await uploadTask;

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw new Error("Failed to upload PDF: " + error);
  }
};
