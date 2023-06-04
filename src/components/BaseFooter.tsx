import React from "react";

interface Props {
  title: string;
}

function BaseFooter(props: Props) {
  const {title} = props;

  return (
    <footer className="base-footer">
      <div className="footer--body">
        <h3 className="footer__title">{title}</h3>
      </div>
    </footer>
  );
}

export default BaseFooter;
