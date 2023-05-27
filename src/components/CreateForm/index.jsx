import { useState } from "react";
import styles from "./index.module.css";
import { usePost } from "../../contexts/postContext";

export default function CreateForm({ id }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { CreatePost } = usePost()

  return (
    <div className={styles["create-form"]}>
      <h3>Create a post</h3>
      <div className={styles["divider"]}></div>
      <div className={styles["form"]}>
        <form onSubmit={(e) => CreatePost(e, { community: id, title: title, content: content })}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            className={styles["title"]}
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            type="text"
            className={styles["content"]}
          />
          <input
            type="submit"
            value="Submit"
            className={styles["submit"]}
          />
        </form>
      </div>
    </div>
  );
}
