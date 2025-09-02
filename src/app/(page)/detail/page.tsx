"use client";

import { Button } from "primereact/button";
import { useRef } from "react";

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (fileInputRef.current?.files?.length) {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);

      const res = await fetch("/api/upload/csv", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("アップロードに失敗しました");
        return;
      }

      const text = await res.text();
      alert(`サーバー応答: ${text}`);
    } else {
      alert("ファイルを選択してください");
    }
  };

  return (
    <div className="p-4 flex gap-2 items-center">
      <input type="file" accept=".csv" ref={fileInputRef} />
      <Button label="アップロード" onClick={handleUpload} />
    </div>
  );
}
