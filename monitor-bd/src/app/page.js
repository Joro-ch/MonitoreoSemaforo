import MemoryView from "../../components/MemoryView";
import Nav from "../../components/Nav";
import SGAView from "../../components/SGAView";
import "../../styles/app.css"

export default function Home() {
  return (
    <main className = "app">
      <Nav />
      <SGAView />
    </main>
  )
}
