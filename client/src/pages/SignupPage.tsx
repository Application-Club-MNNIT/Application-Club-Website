import React from "react";
import { MouseEffectBackground } from "../components/background/MouseEffectBackground";

function SignupPage() {
  return (
    <div className="relative w-full h-full flex">
      <MouseEffectBackground />
      <div className="z-[0]">
        <div className="text-white">
          You guessed it right! This is a Signup page.
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
