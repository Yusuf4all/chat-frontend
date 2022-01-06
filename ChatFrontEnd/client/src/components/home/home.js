import React from "react";
import { Link } from "@reach/router";

function Home() {
  return (
    <>
      <Link to="/auth/sign-up">Go to sign up</Link>
    </>
  );
}

export default Home;
