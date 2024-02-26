"use client"

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
export default function Home() {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>("")


  const handleChangeKeyword = (ev: ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value)
  }

  const handleSubmitKeyword = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    router.push(`/articles?keyword=${keyword}`)
  }

  return (
    <main className="relative h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('images/bg.webp')` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="flex relative z-10 flex-col gap-1.5 items-center justify-center h-screen w-screen">
        <div className="flex flex-col gap-1.5 text-white items-center justify-center">
          <h1 className="text-5xl font-bold">Find news in News App</h1>
          <p className="text-xs">Find out more about what happen in the world</p>
        </div>

        <form className="w-screen flex justify-center" onSubmit={handleSubmitKeyword}>
          <input value={keyword} type="text" className="w-1/2 p-2 rounded text-gray-700 h-10 focus:outline-none transition-all" name="keyword" onChange={handleChangeKeyword} />
          <Button variant={"default"}><Search /></Button>
        </form>
      </div>
    </main>
  );
}
