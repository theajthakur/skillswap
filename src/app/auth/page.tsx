"use client";

import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/register/Register";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [curPage, setCurPage] = useState<string>("login");
  const changePage = (page: string) => {
    if (curPage != page) setCurPage(page);
  };
  return (
    <>
      <div className="flex justify-center flex-col mt-10">
        <div className="navigation flex justify-center">
          <div className="flex gap-2 justify-center border-2 rounded-md border-primary p-0.5">
            <Button
              variant={curPage === "login" ? "default" : "ghost"}
              onClick={() => {
                changePage("login");
              }}
            >
              Login
            </Button>
            <Button
              variant={curPage === "login" ? "ghost" : "default"}
              onClick={() => {
                changePage("register");
              }}
            >
              Register
            </Button>
          </div>
        </div>
        <div className="output">
          {curPage == "login" ? (
            <Login />
          ) : (
            <Register setCurPage={setCurPage} />
          )}
        </div>
      </div>
    </>
  );
}
