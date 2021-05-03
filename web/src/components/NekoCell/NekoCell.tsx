import Neko from 'src/components/Neko'

export const QUERY = gql`
  query FIND_NEKO_BY_ID($id: Int!) {
    neko: neko(id: $id) {
      id
      url
      imageFileName
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Neko not found</div>

export const Success = ({ neko }) => {
  return <Neko neko={neko} />
}
