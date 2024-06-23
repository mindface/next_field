import Link from "next/link";

export default function MemoSectionNavi() {
  const list = [
    { id: "1", name: "section1" },
    { id: "2", name: "section2" },
    { id: "3", name: "section3" },
    { id: "4", name: "section4" },
    { id: "5", name: "section5" },
  ];

  return (
    <nav id="pagination" className="pagination">
      {list.map((item) => (
        <a key={item.id} href={`#section${item.id}`} data-id={item.id}>
          0{item.id}
        </a>
      ))}
      <Link href="#section1" id="pagination1" data-id="1" legacyBehavior>
        @1
      </Link>
    </nav>
  );
}
