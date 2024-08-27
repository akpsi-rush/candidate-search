import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

export default function Home() {
  const SITE_PASSWORD = "brothers";
  const [currentPassword, setCurrentPassword] = useState("");
  const [displayIncorrect, setDisplayIncorrect] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentPassword.toLowerCase() === SITE_PASSWORD) {
      router.push("/search");
    } else {
      setDisplayIncorrect(true);
    }
  };

  return (
    <div className="bg-white w-[300px] h-[300px] m-auto rounded-lg">
      <div className="flex flex-col items-center">
        <div className="font-bold text-[30px] mt-[50px] text-black">
          Enter Password
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className="mt-[20px] border-black border-[1px] h-[40px] rounded-[5px] text-black"
            placeholder="Enter here..."
            required
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
          {displayIncorrect && (
            <div className="text-center text-red-500 mt-[20px]">
              Password Incorrect
            </div>
          )}
          <button className="bg-blue-300 h-[40px] rounded-[5px] text-white mt-[30px]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
