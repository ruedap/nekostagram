import { Link, routes } from '@redwoodjs/router'

import Nekos from 'src/components/Nekos'

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
  return (
    <div className="rw-text-center">
      {'No nekos yet. '}
      <Link to={routes.newNeko()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ nekos }) => {
  return <Nekos nekos={nekos} />
}
