import { BsFillFilterSquareFill } from "react-icons/bs"
import { RiLayout2Fill } from "react-icons/ri"
import styles from "./index.module.css"
import { Outlet } from "react-router-dom";

export default function Filter() {
  return (
    <>
      <div className={styles["filter"]}>
        <Tags />
        <FilterOptions />
      </div>
      <Outlet />
    </>
  );
}

function Tag({ text }) {
  return <div className={styles["tag"]}>{text}</div>;
}

function Tags() {
  return (
    <div className={styles["tags"]}>
      <Tag text="Gaming" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
      <Tag text="Something" />
    </div>
  );
}

function FilterOptions() {
  return (
    <div className={styles["filter-options"]}>
      <RiLayout2Fill />
      <select className={styles["menu-btn"]}>
        <option value="Card">Card</option>
      </select>
      <BsFillFilterSquareFill />
      <select className={styles["filters"]}>
        <option value="New Posts">New Posts</option>
      </select>
    </div>
  );
}
