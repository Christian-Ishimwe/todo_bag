import { Inter } from "next/font/google";
import AddForm from "./components/Form";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="container py-4">
        <div className=" text-white w-1/2 p-2 mx-auto bg-slate-900 rounded-md">
          <h2 className="text-xl text-center">Christian To Do</h2>
          <AddForm/>
        </div>
    </main>
  );
}
