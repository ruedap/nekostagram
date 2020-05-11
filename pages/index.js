import Head from "next/head";

export default () => (
  <div>
    <Head>
      <title>Nekostagram</title>
      <meta description="Cat Lovers Instagram Viewer" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="content">
      <a className="logoOuter" href="https://github.com/ruedap/nekostagram">
        <img className="logo" src="static/images/logo.en.svg" />
      </a>
      <p>Oops! It seems like cats got lost.</p>
      {/* <p>ねこがみつかりませんでした</p> */}
      <p>
        <a href="https://github.com/ruedap/nekostagram">ruedap/nekostagram</a>
      </p>
    </div>
    <style jsx>{`
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      .logoOuter {
        margin-bottom: 3rem;
        max-width: 320px;
      }
      .logo {
        width: 100%;
      }
    `}</style>
    <style global jsx>{`
      body {
        background: #1e1e1e;
        color: #999;
        font-size: 0.8rem;
      }
      a {
        color: #336699;
      }
    `}</style>
  </div>
);
