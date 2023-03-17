"use client";
import React, { useState, useRef } from "react";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";

const Form = () => {
  const [prompt, setPrompt] = useState<String>("");
  const [secret, setSecret] = useState<String>("");
  const [key, setKey] = useState<String>("");
  const [response, setResponse] = useState<String>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [radio, setRadio] = useState<string>("secret");
  // console.log(response);

  const notify = (message: string, type: boolean) => {
    if (type) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (prompt.length && (radio != "" || key != "")) {
      setLoading(true);
      try {
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

        interface gptPrompt {
          message: {
            content: string;
            role: string;
          };
          index: number;
          finish_reason: string;
        }
        interface beError {
          error: string;
        }
        let data: gptPrompt | beError = await res.json();

        const typeGuard = (data: gptPrompt | beError): data is beError => {
          return (data as beError).error !== undefined;
        };
        if (typeGuard(data)) throw new Error(data.error);
        else setResponse(data.message.content);
        setLoading(false);

        scrollToResponse();
      } catch (err: Error | any) {
        console.log(err.message);
        if (err.message == "not allowed")
          notify("Wrong secret, use your own key.", false);
        else notify(err.message, false);
        setLoading(false);
      }
    } else {
      notify("Can't have empty fields.", false);
    }
  };

  const responseRef = useRef<HTMLParagraphElement>(null);
  const scrollToResponse = () => {
    responseRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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

          <div
            onChange={(e: any) => {
              console.log(e.target.value);
              setRadio(e.target.value);
            }}
            className="flex gap-4"
          >
            <div className="flex gap-1">
              <input type="radio" id="key" name="fav_language" value="key" />
              <label htmlFor="key">Your Key</label>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                id="secret"
                name="fav_language"
                value="secret"
              />
              <label htmlFor="secret">Secret</label>
            </div>
          </div>

          {radio == "secret" && (
            <>
              <label className="text-2xl font-bold">Secret</label>
              <input
                className="border-2 border-black rounded-md p-2 m-2"
                type="text"
                name="secret"
                placeholder="Enter Devesh's secret key"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSecret(e.target.value);
                }}
              />
            </>
          )}

          {radio == "key" && (
            <>
              <label className="text-2xl font-bold">Your OpenAI key</label>
              <input
                className="border-2 border-black rounded-md p-2 m-2"
                type="text"
                name="key"
                placeholder="your OpenAI key"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setKey(e.target.value);
                }}
              />
            </>
          )}

          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            onClick={submit}
          >
            Submit
          </button>
          <p
            // ref={responseRef}
            className="italic text-lg py-16 text-center text-bold w-3/4 md:w-2/4"
          >
            {response}
          </p>
          {/* dummy div */}
          <div ref={responseRef}></div>
        </form>
      </div>

      {loading && <Loader />}

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Form;
