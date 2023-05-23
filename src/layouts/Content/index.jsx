import styles from "./index.module.css"
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb"
import { BsChatSquare, BsShare } from "react-icons/bs"

export default function Content() {
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
        </div>
        <div className={styles["community-summary"]}></div>
      </div>
    </div>
  );
}

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