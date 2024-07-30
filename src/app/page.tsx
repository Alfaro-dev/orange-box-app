import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to the Orange Box App</h1>     
      <Header />
    </main>
  );
}
