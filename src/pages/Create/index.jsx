import { useParams } from "react-router-dom"
import Content from "../../layouts/Content"

export default function Create() {
  const { id } = useParams()

  return (
    <Content id={!id ? "Popular" : id} create={true}/> 
  )
}
