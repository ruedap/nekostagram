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
  const list = nekos.map((neko) => {
    return <img key={neko.id} src={neko.url} alt="neko" />
  })

  return <div>{list}</div>
}
