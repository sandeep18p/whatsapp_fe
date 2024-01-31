import axios from "axios";

const cloud_name = process.env.REACT_APP_CLOUD_NAME2;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET2;
export const uploadFiles = async (files) => {
  let formData = new FormData();
  formData.append("upload_preset", cloud_secret);
  let uploaded = [];//upload the file when i am done i am gonna take that and add it inside
  for (const f of files) {
    const { file, type } = f; //extracting file and its type
    formData.append("file", file); //appending it to formData
    let res = await uploadToCloudinary(formData,type);
    // console.log(res);
    uploaded.push({
      file: res,
      type: type,
    });
  }
  return uploaded;
};
const uploadToCloudinary = async (formData,type) => {
  return new Promise(async (resolve) => {
     //raw means it will take all the types of data
    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`,
        formData )
      .then(({ data }) => {
        resolve(data); //resolve to return the data
      })
      .catch((err) => {
        // console.log("----aa gaye---")
        console.log(err);
      });
  });
};
