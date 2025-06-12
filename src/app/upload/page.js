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
      alert('画像ファイルを選択してください')
      return
    }

    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from('photos')
      .upload(fileName, file)

    if (error) {
      console.error(error)
      setMessage('アップロードに失敗しました：' + error.message)
    } else {
      setMessage('アップロードが完了しました！')
      console.log('ファイルが正常にアップロードされました：', data)
    }

    setUploading(false)
  }

  return (
    <div style={{ padding: 30, fontFamily: 'sans-serif' }}>
      <h1>ツリーホール · 画像アップロード</h1>
      <p style={{ marginBottom: 10 }}>匿名で写真をアップロードできます</p>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading} style={{ marginLeft: 10 }}>
        {uploading ? 'アップロード中...' : 'アップロードする'}
      </button>
      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  )
}
