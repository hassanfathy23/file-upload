import Image from "next/image";
import { useState } from "react";

export default function Upload() {
  const [image, setImage] = useState<null | any>(null);
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<null | any>(null);
  console.log(title, image)

  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!file) return alert("you must provide at least one image");
        if (file.size > 1024 * 1024) return alert("file size is too big");
        if (
          file.type !== "image/png" &&
          file.type !== "image/jpeg" &&
          file.type !== "image/jpg"
        )
          return alert("image format should be png or jpeg or jpg");

        let formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/files/upload-one", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setImage(data.url);
      }
    } catch (err) {
      return alert(err);
    }
  };

  const submitHandler = async () => {
    const res = await fetch("/api/files/create-one", {
      body: JSON.stringify({
        title: title,
        url: image,
      }),
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    });

    const data = await res.json();
    setFile(data);
    setImage(null)
    setTitle("")
  };

  return (
    <div className="p-6 flex flex-col gap-4 justify-center items-center shadow-lg rounded-lg">
      <label>upload image</label>
      <input
        type="file"
        onChange={uploadHandler}
        name="image"
        placeholder="insert image"
      />
      <div className="flex flex-col gap-4">
        <label>title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} className="border-2 border-black" />
      </div>
      {image && <Image src={image} alt="image" width={200} height={200} />}
      <button onClick={submitHandler}>upload</button>
    </div>
  );
}
