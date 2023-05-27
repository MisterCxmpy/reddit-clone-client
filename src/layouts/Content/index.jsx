import styles from "./index.module.css";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { BsChatSquare, BsShare } from "react-icons/bs";
import CreateForm from "../../components/CreateForm";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import { usePost } from "../../contexts/postContext";
import { useCommunity } from "../../contexts/communityContext";

export default function Content({ id, create }) {

  const { posts, GetPosts } = usePost()
  const { commInfo, GetCommunityInfo } = useCommunity()

  useEffect(() => {
    GetPosts(id)
    GetCommunityInfo(id)
  }, [id]);

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        {create ? (
          <CreateForm id={id}/>
        ) : (
          <div className={styles["posts"]}>
            {posts.length && posts
              ? posts.map((p, i) => <Post post={p} key={i}/>)
              : "No posts available for this community :("}
          </div>
        )}
        <CommunitySummary commInfo={commInfo} />
      </div>
    </div>
  );
}

//#region Posts

function Votes({ post }) {
  return (
    <div className={styles["votes"]}>
      <button>
        <TbArrowBigUp />
      </button>
      <span>{post.upvotes - post.downvotes}</span>
      <button>
        <TbArrowBigDown />
      </button>
    </div>
  );
}

function PostAuthor({ post }) {
  return (
    <div className={styles["post-author"]}>
      <div className={styles["community-picture"]}></div>
      <span className={styles["community-name"]}>c/{post.community}</span>
      <span style={{ color: "#424242" }}>•</span>
      <span className={styles["author"]}>
        Posted by u/{post.author} 19 hours ago
      </span>
    </div>
  );
}

function PostActions({ post }) {
  return (
    <div className={styles["post-actions"]}>
      <button className={styles["action"]}>
        <BsChatSquare /> {post.comments} Comments
      </button>
      <button className={styles["action"]}>
        <BsShare /> Share
      </button>
    </div>
  );
}

function PostContent({ post }) {
  return (
    <div className={styles["post-content"]}>
      <PostAuthor post={post} />
      <span className={styles["post-title"]}>{post.title}</span>
      <span className={styles["post-message"]}>{post.content}</span>
      <PostActions post={post} />
    </div>
  );
}

function Post({ post }) {
  return (
    <div className={styles["post"]}>
      <Votes post={post} />
      <PostContent post={post} />
    </div>
  );
}

//#endregion

//#region Summary

function CommunityImage({ commInfo }) {
  return <img src={commInfo.community_image} className={styles["community-image"]}></img>;
}

function InnerContent({ commInfo }) {
  return (
    <div className={styles["inner-content"]}>
      <span className={styles["community-name"]}>c/{commInfo.community_name}</span>
      <p className={styles["summary-content"]}>
        {commInfo.community_summary}
      </p>
      <button className={`${styles["create-post"]} ${styles["btn"]}`}>
        Create Post
      </button>
      <button className={`${styles["create-community"]} ${styles["btn"]}`}>
        Create Community
      </button>
    </div>
  );
}

function CommunitySummary({ commInfo }) {
  return (
    <div className={styles["community-summary"]}>
      <div className={styles["summary"]}>
        <CommunityImage commInfo={commInfo} />
        <InnerContent commInfo={commInfo} />
      </div>
    </div>
  );
}

//#endregion
