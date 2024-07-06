"use client";
import { useState } from "react";

function Chat() {
const[text, setText]=useState("");
const[message, setMessage]=useState([]);
function handleSubmit(e) {
e.preventDefault();
console.log(text);
}

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[ifr, auto]">
      <div>
        <h3 className="text-5xl">messages</h3>
      </div>
      <form className="max-w-4xl pt-12" onSubmit={handleSubmit}>
          <div className="join w-full">
            <input type="text" className="join-item input input-bordered w-full"
            placeholder="Message GeniusGPT" value={text} onChange={(e)=> setText(e.target.value)}
            ></input>
            <button type="submit" className="join-item btn btn-primary">Ask Question</button>
          </div>
      </form>
    </div>
  )
}

export default Chat
