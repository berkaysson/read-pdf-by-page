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
  UploadTask,
} from "firebase/storage";
import { Dispatch, SetStateAction } from "react";

export const addSavedPdf = async (
  database: Database,
  profile: UserProfile | null,
  newPdf: SavedPdf,
  content: string[],
  storage: FirebaseStorage,
  setProgress: Dispatch<SetStateAction<number>>
) => {
  if (!profile || !content) {
    throw new Error("Profile or file is null");
  }

  const existingPdfIndex = profile.savedPdfs.findIndex(
    (pdf) => pdf.title === newPdf.title
  );

  if (existingPdfIndex === -1) {
    setProgress(85);

    const { uid } = profile;
    const downloadURL = await uploadPdf(
      uid,
      content,
      storage,
      setProgress,
      newPdf.title
    );

    const updatedPdfs = [...profile.savedPdfs, { ...newPdf, downloadURL }];
    const updatedProfile = { ...profile, savedPdfs: updatedPdfs };

    await set(ref(database, `users/${uid}`), updatedProfile);
    setProgress(99);

    return { profile: updatedProfile, success: true };
  }

  return { profile, success: false };
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

  if (existingPdfIndex === -1) {
    return { profile, success: false };
  }

  const updatedPdfs = [...profile.savedPdfs];
  const pdfToUpdate = updatedPdfs[existingPdfIndex];
  pdfToUpdate.savedPage = newPdfPage;
  pdfToUpdate.updateDate = new Date().toISOString();
  const updatedProfile = { ...profile, savedPdfs: updatedPdfs };

  try {
    set(ref(database, `users/${profile.uid}`), updatedProfile);
    return { profile: updatedProfile, success: true };
  } catch (error) {
    console.error("Error updating saved pdf page:", error);
    return { profile, success: false };
  }
};

export const deleteSavedPdf = async (
  pdf: SavedPdf,
  database: Database,
  profile: UserProfile,
  storage: FirebaseStorage
) => {
  if (!profile || !storage) {
    throw new Error("Profile or storage is null");
  }

  const existingPdfIndex = profile.savedPdfs.findIndex(
    (_pdf) => _pdf.title === pdf.title
  );
  if (existingPdfIndex < 0) {
    alert("Pdf is not existing in database.");
    return profile;
  }

  const updatedPdfs = [...profile.savedPdfs];
  updatedPdfs.splice(existingPdfIndex, 1);
  const updatedProfile = { ...profile, savedPdfs: updatedPdfs };
  set(ref(database, `users/${profile.uid}`), updatedProfile);

  const path = `files/${profile.uid}/${pdf.title}`;
  try {
    await deleteObject(storageRef(storage, path));
    return updatedProfile;
  } catch (error) {
    console.error("Error deleting pdf from storage:", error);
    return profile;
  }
};

export const getPdfFromStorage = async (
  profile: UserProfile,
  pdf: SavedPdf,
  storage: FirebaseStorage
): Promise<File | null> => {
  if (!profile || !profile.uid || !pdf.title) {
    console.error("Error retrieving PDF from storage: Invalid input");
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
  content: string[],
  storage: FirebaseStorage,
  setProgress: Dispatch<SetStateAction<number>>,
  fileName: string
): Promise<string> => {
  if (userId === null) {
    throw new Error("userId is null");
  }
  if (content === null) {
    throw new Error("file is null");
  }
  if (fileName === null || fileName === "") {
    throw new Error("fileName is null");
  }

  const _storageRef: StorageReference = storageRef(
    storage,
    `files/${userId}/${fileName}`
  );

  const contentBlob = new Blob([JSON.stringify(content)], {
    type: "application/json",
  });

  const uploadTask = uploadBytesResumable(_storageRef, contentBlob);

  await handleUploadTask(uploadTask, setProgress);

  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  return downloadURL;
};

const handleUploadTask = (
  uploadTask: UploadTask,
  setProgress: Dispatch<SetStateAction<number>>
) => {
  return new Promise<void>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress * 0.8);
      },
      reject,
      resolve
    );
  });
};
