import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const { data: sessionData } = useSession();

  const firstName = sessionData?.user?.name?.split(" ")[0];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-white text-center text-2xl">
        {sessionData && <span>Hey {firstName}, welcome back!</span>}
      </p>
      <div className="flex gap-3">
        {sessionData && (
          <Link href={"/dashboard"} className="btn-secondary btn">
            Dashboard
          </Link>
        )}
        <button
          className="btn-primary btn"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Login;
