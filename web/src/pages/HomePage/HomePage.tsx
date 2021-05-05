import HomeListCell from 'src/components/HomeListCell'

const HomePage = () => {
  return (
    <>
      <h1 className="tw-flex tw-justify-center tw-p-8">
        <img src="/images/logo.en.svg" alt="Nekostagram" />
      </h1>

      <HomeListCell />
    </>
  )
}

export default HomePage
