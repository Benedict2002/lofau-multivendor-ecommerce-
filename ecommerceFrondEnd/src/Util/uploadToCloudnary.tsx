export const uploadToCloudnary = async (pics: any) => {
  const cloud_name = "droomnbwy";
  const upload_preset = "b_ecom";

  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/droomnbwy/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData.url;
  } else {
    console.log("Error : pics not found");
  }
};
