import { useRef, useState } from "react";
import styles from "./index.module.css"
import { useAuth } from "../../contexts/authContext";
import { useCommunity } from "../../contexts/communityContext";

export default function CreateCommunityForm({ state, setState }) {

  const formRef = useRef()

  const [name, setName] = useState("")
  const [summary, setSummary] = useState("")
  const [rule, setRule] = useState("")
  const [rules, setRules] = useState([])
  const [image, setImage] = useState("")

  const { user } = useAuth()
  const { CreateCommunity } = useCommunity()

  const exit = () => {
    setName("")
    setSummary("")
    setRule("")
    setRules([])
    setImage("")
    
    setState()
  }

  const addRule = () => {
    if (!rule) return;

    setRules(prev => [...prev, rule])

    setRule("")
  }

  const createCommunity = () => {
    const communityData = {community_name: name, community_summary: summary, community_rules: rules, community_image: image, community_leader: user.user_id}
    CreateCommunity(communityData)
    exit()
  }

  return state ? (
    <div className={styles["overlay"]} style={state ? {display: "block"} : {display: "none"}}>
      <div className={styles["container"]}>
        <button onClick={exit} className={styles["close-btn"]}>&times;</button>
        <h3>Create community</h3>
        <div className={styles["divider"]}></div>
        <div className={styles["form"]}>
          <form ref={formRef} onSubmit={createCommunity}>
            <div className={styles["inputs"]}>
              <div className={`${styles["input-field"]} ${styles["community-name-field"]}`}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={22} required />
                <span>Community Name</span>
                <span className={styles["community-tag"]}>c/</span>
                <span className={styles["character-count"]}>{22 - name.length} Characters remaining</span>
              </div>
              <div className={`${styles["input-field"]} ${styles["community-summary-field"]}`}>
                <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} required />
                <span>Community Summary</span>
              </div>
              <div className={`${styles["input-field"]} ${styles["community-rules-field"]}`}>
                <input type="text" value={rule} onChange={(e) => setRule(e.target.value)} maxLength={25} />
                <span>Community Rules</span>
                <button type="button" onClick={addRule} className={styles["rule-add"]}>Add Rule</button>
              </div>
              <div className={`${styles["input-field"]} ${styles["community-rules-field"]}`}>
                <span>Current Rules</span>
                <div className={styles["rules"]}>
                  <ol>
                    {rules.map((r) => <li>{r}</li>)}
                  </ol>
                </div>
              </div>
              <div className={`${styles["input-field"]} ${styles["community-image-field"]}`}>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image URL" required />
                <span>Community Image</span>
              </div>
              <div className={`${styles["input-field"]} ${styles["community-actions"]}`}>
                <button type="button" onClick={exit} className={`${styles["btn"]} ${styles["cancel-btn"]}`}>Cancel</button>
                <button type="submit" className={`${styles["btn"]} ${styles["create-community-btn"]}`}>Create Community</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
