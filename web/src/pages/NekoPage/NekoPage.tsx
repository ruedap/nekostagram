import NekosLayout from 'src/layouts/NekosLayout'
import NekoCell from 'src/components/NekoCell'

const NekoPage = ({ id }) => {
  return (
    <NekosLayout>
      <NekoCell id={id} />
    </NekosLayout>
  )
}

export default NekoPage
