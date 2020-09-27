export const attachmentsChangeHandler = (e, cb) => {
  let files = [];

  let updateAttachements = (files) => {
    cb(files);
  };

  let theFiles = e.target.files;
  for (let i = 0; i < theFiles.length; i++) {
    const reader = new FileReader();
    let file = theFiles[i];
    reader.addEventListener("load", () => {
      let data = reader.result;
      files.push({ filename: file.name, data: data });
      if (files.length === theFiles.length) {
        updateAttachements(files);
      }
    });
    reader.readAsDataURL(file);
  }
};
