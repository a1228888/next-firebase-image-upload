'use client'
import React, { useState } from 'react'
import { supabase } from '../supabaseConfig'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      alert('请选择图片文件')
      return
    }

    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from('photos') // ← 请确保你的 bucket 名是 photos
      .upload(fileName, file)

    if (error) {
      console.error(error)
      setMessage('上传失败：' + error.message)
    } else {
      setMessage('上传成功！')
      console.log('File uploaded:', data)
    }

    setUploading(false)
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>图片上传</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? '上传中...' : '上传'}
      </button>
      <p>{message}</p>
    </div>
  )
}
