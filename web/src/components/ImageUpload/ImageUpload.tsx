import React, { useState } from 'react'
import firebase, { storage, constants } from 'web/lib/firebase'
import { TextField } from '@redwoodjs/forms'

export const ImageUpload: React.VFC = () => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [imageFileName, setImageFileName] = useState<string>()

  const onChange = (event) => {
    const inputFile = (event.target as HTMLInputElement).files[0]
    if (!inputFile) {
      console.log('ファイルが選択されていません')
      return
    }

    // TODO: image validation

    const imageName = `20210503-${inputFile.name}`

    const next = (snapshot) => {
      // 進行中のsnapshotを得る
      // アップロードの進行度を表示
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(percent + '% done')
      console.log(snapshot)
    }

    const error = (error) => {
      // エラーハンドリング
      console.log(error)
    }

    const complete = () => {
      // 完了後の処理
      // 画像表示のため、アップロードした画像のURLを取得
      storage
        .ref(constants.STORAGE_REF)
        .child(imageName)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          setImageUrl(fireBaseUrl)
          setImageFileName(imageName)
        })
      // TODO: error
    }

    // アップロード処理
    const upload = storage
      .ref(constants.STORAGE_REF)
      .child(imageName)
      .put(inputFile)
    upload.on(firebase.storage.TaskEvent.STATE_CHANGED, next, error, complete)
  }

  return (
    <>
      <h2>画像アップロード</h2>
      <input type="file" onChange={onChange} multiple={false} />
      <img src={imageUrl} alt="uploaded" style={{ maxWidth: '300px' }} />
      <TextField
        name="imageFileName"
        value={imageFileName}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />
    </>
  )
}
