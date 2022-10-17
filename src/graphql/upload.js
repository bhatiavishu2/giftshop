import { uploadUrl } from "../constants";

export const uploadImages = (files = []) => {
  const fd = new FormData();
  Object.values(files).forEach((file) => {
    fd.append("picture", file);
  });

  return fetch(uploadUrl, {
    body: fd,
    method: "post"
  });
};
