'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseConfig'

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from('photos').list('', {
        sortBy: { column: 'created_at', order: 'desc' },
      })

      if (error) {
        console.error('画像の取得に失敗しました / 获取图片失败:', error)
      } else {
        const urls = await Promise.all(
          data.map(async (item) => {
            const { data: urlData } = await supabase.storage.from('photos').getPublicUrl(item.name)
            return urlData.publicUrl
          })
        )
        setImages(urls)
      }

      setLoading(false)
    }

    fetchImages()
  }, [])

  return (
    <div style={{ padding: 30, fontFamily: 'sans-serif' }}>
      <h1>画像一覧 · Gallery</h1>
      {loading ? (
        <p>読み込み中... / 加载中...</p>
      ) : images.length === 0 ? (
        <p>画像がまだアップロードされていません / 暂无上传图片</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {images.map((url, index) => (
            <img key={index} src={url} alt={`image-${index}`} style={{ width: '100%', borderRadius: 8 }} />
          ))}
        </div>
      )}
    </div>
  )
}
