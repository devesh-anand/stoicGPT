import Image from "next/image";
import { Inter } from "next/font/google";
import Form from "@/components/Form";

const inter = Inter({ subsets: ["latin"] });
const mainImg = [
  "https://pub-e8d136c018774bca8bf32491147abf4b.r2.dev/stoics/stoic-chads.png",
  "https://pub-e8d136c018774bca8bf32491147abf4b.r2.dev/stoics/stoic-chads-2.png",
  "https://pub-e8d136c018774bca8bf32491147abf4b.r2.dev/stoics/stoic-chads-3.png",
  "https://pub-e8d136c018774bca8bf32491147abf4b.r2.dev/stoics/stoic-chads-4.png",
];
const bgs = ["#DFEFE5", "#E6F2E6", "#E9F2EB", "#e1ebe0"];

export default function Home() {
  //get a random number between 0 and 3
  const randomNum = Math.floor(Math.random() * 4);
  return (
    <div
      className={`flex flex-col items-center h-screen`}
      style={{ backgroundColor: `${bgs[randomNum]}` }}
    >
      <h1 className="text-3xl font-semibold pt-4">Stoic GPT</h1>
      <Image
        src={mainImg[randomNum]}
        alt="Stoic Philosophers giving chad poses"
        width={340}
        height={340}
      />
      <Form />
    </div>
  );
}
