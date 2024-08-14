import { client } from "../libs/microcms.client";
import MemoContentRepositories from "./MemoContentRepositories";
import MemoContentMaker from "./MemoContentMaker";

const getStaticPostList = async () => {
  const repositoryData = await client.get({
    endpoint: "repositories",
    // 更新が発生するケースで利用(ISR)
    // customRequestInit: {
    //   next: { revalidate: 60 * 10 } // ※10分
    // }
  });
  return repositoryData.contents;
};

export default async function MemoSection() {
  const postContents = await getStaticPostList();

  return (
    <>
      <div className="l-box memo-classter">
        <div
          className="l-section memo-area memo-area--repository"
          id="section2"
        >
          <MemoContentRepositories repositoryList={postContents} />
        </div>
        <div className="l-section memo-area" id="section1">
          <MemoContentMaker />
        </div>
      </div>
    </>
  );
}
