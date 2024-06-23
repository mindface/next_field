type repositoryItem = {
  title: string;
  category: string;
  description: string;
  link: string;
};

type Props = {
  repositoryList: repositoryItem[];
};

export default function MemoContentRepositories(props: Props) {
  const repository_data = props.repositoryList ?? [];

  return (
    <div className="content">
      <h3 className="content__title">make repositories</h3>
      <div className="content__text"></div>
      <div className="data-box">
        {repository_data.map((item, index) => {
          return (
            <div key={"repository" + index} className="box">
              <h3 className="title">
                <a href={item.link} target="_new">
                  {item.title}
                </a>
              </h3>
              <div className="text">カテゴリ</div>
              <div
                className="tag-box"
                dangerouslySetInnerHTML={{ __html: item.category }}
              ></div>
              <div className="description">
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
