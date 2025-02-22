import React from "react";
import { MouseEffectBackground } from "../components/background/MouseEffectBackground";

function LoginPage() {
  return (
    <div className="relative w-full h-full flex">
      <MouseEffectBackground />
      <div className="z-[0]">
        <div className="text-white">Guess what? This is a login page.</div>
      </div>
    </div>
  );
}

export default LoginPage;
