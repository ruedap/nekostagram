import HomeListCell from 'src/components/HomeListCell'
import firebase, { storage } from 'web/lib/firebase'
import { useState } from 'react'

const STORAGE_REF = 'nekos'

const HomePage = () => {
  const [image, setImage] = useState<File | undefined>()
  const [imageUrl, setImageUrl] = useState('')
  const handleImage = (event) => {
    const image = (event.target as HTMLInputElement).files[0]
    setImage(image)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    if (!image) {
      console.log('ファイルが選択されていません')
    }
    // アップロード処理
    const uploadTask = storage.ref(`/${STORAGE_REF}/${image.name}`).put(image)
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    )
  }
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
      .ref(STORAGE_REF)
      .child(image.name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setImageUrl(fireBaseUrl)
      })
  }

  return (
    <>
      <h1>
        <img src="/images/logo.en.svg" alt="Nekostagram" />
      </h1>

      <h2>画像アップロード</h2>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImage} multiple={false} />
        <button>Upload</button>
      </form>
      <img src={imageUrl} alt="uploaded" />

      <h2>画像リスト</h2>
      <HomeListCell />
    </>
  )
}

export default HomePage
