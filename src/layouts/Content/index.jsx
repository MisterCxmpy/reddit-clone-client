import styles from "./index.module.css"
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb"
import { BsChatSquare, BsShare } from "react-icons/bs"

export default function Content({ id }) {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <div className={styles["posts"]}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          {console.log(id)}
        </div>
        <CommunitySummary />
      </div>
    </div>
  );
}

//#region Posts

function Votes() {
  return (
    <div className={styles["votes"]}>
      <button>
        <TbArrowBigUp />
      </button>
      <span>0</span>
      <button>
        <TbArrowBigDown />
      </button>
    </div>
  );
}

function PostAuthor() {
  return (
    <div className={styles["post-author"]}>
      <div className={styles["community-picture"]}></div>
      <span className={styles["community-name"]}>c/Gaming</span>
      <span style={{ color: "#424242" }}>•</span>
      <span className={styles["author"]}>Posted by u/awesomeuser123 19 hours ago</span>
    </div>
  );
}

function PostActions() {
  return (
    <div className={styles["post-actions"]}>
      <button className={styles["action"]}>
        <BsChatSquare /> 3.2k Comments
      </button>
      <button className={styles["action"]}>
        <BsShare /> Share
      </button>
    </div>
  );
}

function PostContent() {
  return (
    <div className={styles["post-content"]}>
      <PostAuthor />
      <div className={styles["post-message"]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor tempora delectus odit, veritatis eius facere, nemo reprehenderit temporibus dolorem officiis repudiandae enim corporis. Ea praesentium obcaecati repudiandae eveniet sint saepe?
      </div>
      <PostActions />
    </div>
  );
}

function Post() {
  return (
    <div className={styles["post"]}>
      <Votes />
      <PostContent />
    </div>
  );
}

//#endregion

//#region Summary

function CommunityImage() {
  return <div className={styles["community-image"]}></div>;
}

function InnerContent() {
  return (
    <div className={styles["inner-content"]}>
      <span className={styles["community-name"]}>c/Gaming</span>
      <p className={styles["summary-content"]}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium nobis placeat at eaque, voluptas eos sapiente magnam, aliquam commodi maiores libero molestias dicta itaque porro iste fugiat autem nulla doloremque?
      </p>
      <button className={`${styles["create-post"]} ${styles["btn"]}`}>Create Post</button>
      <button className={`${styles["create-community"]} ${styles["btn"]}`}>Create Community</button>
    </div>
  );
}

function CommunitySummary() {
  return (
    <div className={styles["community-summary"]}>
      <div className={styles["summary"]}>
        <CommunityImage />
        <InnerContent />
      </div>
    </div>
  );
}

//#endregion