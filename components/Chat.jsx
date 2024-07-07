"use client";
import { useState } from "react";
import { generateChatResponse } from "../utils/actions"
import { useMutation } from "@tanstack/react-query";

function Chat() {
const[text, setText]=useState("");
const[messages, setMessages]=useState([]);

const { mutate } = useMutation({
  mutationFn: (newMessage) => generateChatResponse([...messages, newMessage]),
  onSuccess: (responseMessage) => {
    if(!responseMessage) {
      toast.error("Something goes wrong...")
    }
    setMessages((prevMessages) => [...prevMessages, responseMessage]);
    console.log("debug:", messages);
  },
});

function handleSubmit(e) {
  e.preventDefault();
  console.log(text);
  const newMessage = {role: "user", content: text};
  mutate(newMessage);;
  setMessages((prevState) => ([...prevState, newMessage]));
  setText("");
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
