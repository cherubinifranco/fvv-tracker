import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import Menu from "../components/Menu";

export default function IndexPage() {
  return (
    <main className="flex flex-row">
      <Timer />
      <Menu />
    </main>
  )
}
