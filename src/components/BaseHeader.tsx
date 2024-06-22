interface Props {
  title: string;
}

export default function BaseHeader(props: Props) {
  return (
    <header className="base-header">
      <div className="header--body">
        <div className="logo">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
        <h3 className="header__title">{/* { props.title } */}</h3>
      </div>
    </header>
  )
}
