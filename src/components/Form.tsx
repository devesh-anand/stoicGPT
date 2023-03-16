"use client";
import React, { useState } from "react";

const Form = () => {
  const [prompt, setPrompt] = useState<String>("");
  const [secret, setSecret] = useState<String>("");

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await fetch("/api/getresponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        secret: secret,
      }),
    });
    console.log(await res.json());
  };

  return (
    <div>
      <form className="flex flex-col items-center h-full">
        <label className="text-2xl font-bold">Prompt</label>
        <textarea
          className="border-2 border-black rounded-md p-2 m-2"
          name="prompt"
          placeholder="Ask a stoic question"
          rows={8}
          cols={35}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setPrompt(e.target.value);
          }}
        />
        <label className="text-2xl font-bold">Secret</label>
        <input
          className="border-2 border-black rounded-md p-2 m-2"
          type="text"
          name="secret"
          placeholder="Enter secret key"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSecret(e.target.value);
          }}
        />
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          onClick={submit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
