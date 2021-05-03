export const QUERY = gql`
  query NEKOS {
    nekos {
      id
      url
      imageFileName
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div> {'No nekos yet. '} </div>
}

export const Success = ({ nekos }) => {
  const BASE_URL =
    'https://firebasestorage.googleapis.com/v0/b/nekostagram-com.appspot.com/o/nekos%2F'
  const list = nekos.map((neko) => {
    return (
      <a
        key={neko.id}
        href={neko.url}
        target="_blank"
        rel="noreferrer"
        className="neko"
      >
        <img
          src={`${BASE_URL}${neko.imageFileName}?alt=media`}
          alt="neko"
          className="nekoImage"
        />
      </a>
    )
  })

  return <div>{list}</div>
}
