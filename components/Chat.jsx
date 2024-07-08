"use client";
import { useState } from "react";
import { generateChatResponse } from "../utils/actions";
import { useMutation } from "@tanstack/react-query";

function Chat() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate, isPending } = useMutation({
    mutationFn: (newMessage) => generateChatResponse([...messages, newMessage]),
    onSuccess: (responseMessage) => {
      if (!responseMessage) {
        toast.error("Something goes wrong...");
      }
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
      console.log("debug:", messages);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(text);
    const newMessage = { role: "user", content: text };
    mutate(newMessage);
    setMessages((prevState) => [...prevState, newMessage]);
    setText("");
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr, auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role === "user" ? "👤" : "🤖";
          const bg = role === "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={index}
              className={`${bg} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-4">{avatar}</span>
              <span className="max-w-3xl">{content}</span>
            </div>
          );
        })}
        {isPending ? <span className="loading"></span> : null}
      </div>
      <form className="max-w-4xl pt-12" onSubmit={handleSubmit}>
        <div className="join w-full">
          <input
            type="text"
            className="join-item input input-bordered w-full"
            placeholder="Message GeniusGPT"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button
            type="submit"
            className="join-item btn btn-primary"
            disabled={isPending}
          >
            {isPending ? "Please wait" : "Ask question"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
