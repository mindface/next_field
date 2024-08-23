import Link from "next/link";
// import CircleCanvas from "./module/CircleCanvas";
import InteractivePoints from "./module/InteractivePoints";
import linkLists from "../json/menu.json";

type Props = {
  menuAction?: () => void;
};

export default function MenuBox(props: Props) {
  const menuAction = props.menuAction ?? (() => {});

  return (
    <section className="canvas-section menu-section _flex_c_">
      <canvas id="menu" className="canvas" ref={(node) => {
        if(node) {
          const hierarchy = new InteractivePoints({
            f_canvas: node,
          });
          hierarchy.init();
        }
      }}></canvas>
      <nav className="nenu-nav">
        {linkLists.map((link) => (
          <Link href={link.path} as={link.path} key={link.path} legacyBehavior>
            <a className="link" onClick={menuAction}>
              {link.name}
            </a>
          </Link>
        ))}
      </nav>
    </section>
  );
}
