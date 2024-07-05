
import ThemeToggle from "./ThemeToggle";
import { SiOpenaigym } from "react-icons/si";

function SidebarHeader() {
  return (
    <div className="min-w-full flex justify-between items-center">
        <SiOpenaigym className="w-10 h-10 text-green-700 bold"></SiOpenaigym>
        <h2 className="text-xl text-green-700 font-extrabold">GPT Genius</h2>
        <ThemeToggle></ThemeToggle>
    </div>
  )
}

export default SidebarHeader
