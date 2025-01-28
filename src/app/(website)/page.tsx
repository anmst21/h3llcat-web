"use client";

import { subscribeUser } from "@/actions/subscribe";

export default function Home() {
  return (
    <div className="home">
      <button
        onClick={async () => await subscribeUser("anmstudios21c@gmail.com")}
      >
        Subscribe
      </button>
    </div>
  );
}
