import styles from "./index.module.css";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { BsChatSquare, BsShare } from "react-icons/bs";
import CreateForm from "../../components/CreateForm";
import { useEffect, useState } from "react";
import { usePost } from "../../contexts/postContext";
import { useCommunity } from "../../contexts/communityContext";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { useAuth } from "../../contexts/authContext";

export default function Content({ id, create }) {
  const { posts, GetPosts, Vote, votes } = usePost();
  const { commInfo, GetCommunityInfo, setCurrentCommunity } = useCommunity();
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem("id", id);
    setCurrentCommunity(id);
    GetPosts(id);
    GetCommunityInfo(id);
  }, [id]);

  useEffect(() => {
    GetPosts(id);
  }, [votes]);

  return (
    <>
      {!create ? (
        <>
          <div className={styles["banner"]}>
            <img
              src={commInfo.community_image}
              className={styles["banner-image"]}
            ></img>
          </div>
          <div className={styles["community"]}>
            <div className={styles["info"]}>
              <img
                src={commInfo.community_image}
              ></img>
              <div className={styles["names"]}>
                <h1 className={styles["main-title"]}>r/{commInfo.community_name}</h1>
                <h2 className={styles["sub-title"]}>r/{commInfo.community_name}</h2>
                <button className={styles["join-btn"]}>Join Community</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <div className={styles["container"]}>
        <div className={styles["content"]}>
          {create ? (
            <CreateForm id={id} />
          ) : (
            <div className={styles["posts"]}>
              {posts.length && posts
                ? posts.map((p, i) => (
                    <Post post={p} key={i} Vote={Vote} user={user} />
                  ))
                : "No posts available for this community :("}
            </div>
          )}
          <CommunitySummary commInfo={commInfo} id={id} />
        </div>
      </div>
    </>
  );
}

//#region Posts

function Votes({ post, Vote, user }) {
  const voteCheck = (vote_type) => {
    const check = user.votes.some(
      (vote) => vote.vote_type === vote_type && vote.post_id === post.post_id
    );
    return check;
  };

  return (
    <div className={styles["votes"]}>
      <button
        onClick={() => Vote(post, "upvotes")}
        style={
          voteCheck("upvotes") ? { color: "#6c55f0" } : { color: "#707070" }
        }
      >
        <TbArrowBigUp />
      </button>
      <span>{post.votes > 0 ? post.votes : 0}</span>
      <button
        onClick={() => Vote(post, "downvotes")}
        style={voteCheck("downvotes") ? { color: "#ff4040" } : null}
      >
        <TbArrowBigDown />
      </button>
    </div>
  );
}

function PostAuthor({ post }) {
  const postedDate = new Date(post.created_at);
  const adjustedDate = new Date(postedDate.setHours(postedDate.getHours() + 1));

  return (
    <div className={styles["post-author"]}>
      <div className={styles["community-picture"]}></div>
      <span className={styles["community-name"]}>c/{post.community}</span>
      <span style={{ color: "#424242" }}>•</span>
      <span className={styles["author"]}>
        Posted by u/{post.author}{" "}
        {
          <ReactTimeAgo
            date={adjustedDate}
            locale="en-GB"
            timeStyle="round-minute"
          />
        }
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

function Post({ post, Vote, user }) {
  return (
    <div className={styles["post"]}>
      <Votes post={post} Vote={Vote} user={user} />
      <PostContent post={post} />
    </div>
  );
}

//#endregion

//#region Summary

function CommunityImage({ commInfo }) {
  return (
    <img
      src={commInfo.community_image}
      className={styles["community-image"]}
    ></img>
  );
}

function InnerContent({ commInfo, id }) {
  const navigate = useNavigate();

  return (
    <div className={styles["inner-content"]}>
      <span className={styles["community-name"]}>
        c/{commInfo.community_name}
      </span>
      <p className={styles["summary-content"]}>{commInfo.community_summary}</p>
      <button
        onClick={() => {
          navigate(`/c/${id}/create/`);
        }}
        className={`${styles["create-post"]} ${styles["btn"]}`}
      >
        Create Post
      </button>
      <button className={`${styles["create-community"]} ${styles["btn"]}`}>
        Create Community
      </button>
    </div>
  );
}

function CommunitySummary({ commInfo, id }) {
  return (
    <div className={styles["community-summary"]}>
      <div className={styles["summary"]}>
        <CommunityImage commInfo={commInfo} />
        <InnerContent commInfo={commInfo} id={id} />
      </div>
    </div>
  );
}

//#endregion
