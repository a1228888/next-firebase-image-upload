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
      alert('画像ファイルを選択してください（请先选择图片）')
      return
    }

    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from('photos')
      .upload(fileName, file)

    if (error) {
      console.error(error)
      setMessage('アップロードに失敗しました（上传失败）：' + error.message)
    } else {
      setMessage('アップロードが完了しました！（上传成功）')
      console.log('ファイルが正常にアップロードされました（文件上传成功）：', data)
    }

    setUploading(false)
  }

  return (
    <div style={{ padding: 30, fontFamily: 'sans-serif' }}>
      <h1>ツリーホール · 画像アップロード（树洞图片上传）</h1>
      <p style={{ marginBottom: 10 }}>匿名で写真をアップロードできます（可匿名上传图片）</p>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading} style={{ marginLeft: 10 }}>
        {uploading ? 'アップロード中...（上传中）' : 'アップロードする（上传）'}
      </button>
      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  )
}
