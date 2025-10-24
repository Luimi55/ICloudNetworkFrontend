import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const getFileIcon = (file) => {
  if (file.type.startsWith("image/")) return "🖼️";
  if (file.type.startsWith("video/")) return "🎬";
  if (file.type.startsWith("audio/")) return "🎵";
  if (file.type === "application/pdf") return "📄";
  if (file.type.includes("word")) return "📝";
  if (file.type.includes("excel")) return "📊";
  return "📁"; // default
};

const FileDragDrop = ({
  filesCallback,
  multiple,
  text
}) => {

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => Object.assign(file, { id: crypto.randomUUID() })),
    ]);
  }, []);
  

  const removeFile = (id) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: multiple,
  });

  useEffect(()=>{
    filesCallback(files)
  },[files])

  const downloadFile = (file) => {
    // Create a temporary download link
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", fontFamily: "sans-serif" }}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed gray",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: isDragActive ? "#f0f0f0" : "white",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop files here…</p>
        ) : (
          <p>{text}</p>
        )}
      </div>

      {/* File list */}
      <div
        style={{
          marginTop: 15,
          maxHeight: 150, // 👈 scrollable container
          overflowY: "auto",
          border: files.length > 0 ? "1px solid #ddd" : "none",
          borderRadius: "6px",
          padding: files.length > 0 ? "4px" : 0,
          background: files.length > 0 ? "#fafafa" : "transparent",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {files.map((file) => (
            <li
              key={file.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 10px",
                borderBottom: "1px solid #eee",
                background: "#fff",
                borderRadius: "4px",
                marginBottom: "6px",
              }}
            >
              <span style={{ marginRight: 10, flexShrink: 0 }}>{getFileIcon(file)}</span>
              <span
                style={{
                  flexGrow: 1,
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={file.name} // 👈 full name on hover
              >
                {file.name}
              </span>
              <button
                onClick={() => downloadFile(file)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginLeft: 6,
                }}
                title="Download"
              >
                ⬇️
              </button>
              <button
                onClick={() => removeFile(file.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginLeft: 8,
                }}
                title="Remove"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FileDragDrop