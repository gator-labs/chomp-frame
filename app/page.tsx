
import type { Metadata, ResolvingMetadata } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export const revalidate = 0 

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
 
  // fetch data
  const {question} = await fetch(`http://localhost:3001/api/question/get`, {
    headers: {
      'Content-Type': 'application/json',
      'api-key': 'foo' // Adding the 'api-key' header with the value 'foo'
    },
  }).then((res) => res.json())
 console.log("got question")
 console.log(question)
  const frameMetadata = getFrameMetadata({
    image: {
      src: `${baseURL}/chomp.png`,
      aspectRatio: "1:1",
    },
    buttons: [
      {
        label: question,
        action: "post",
      },
    ],
    postUrl: `${baseURL}api/frames`,
  });
 
  return {
    title: "Mint a cNFT on Solana",
    description: "Mint a cNFT to your verified Solana address using the Helius Mint API",
    openGraph: {
      title: "Mint a cNFT on Solana",
      description: "Mint a cNFT to your verified Solana address using the Helius Mint API",
      images: ["https://helius-frame.vercel.app/default.jpg"],
    },
    other: {
      ...frameMetadata,
    },
  }
}

export default function Page() {
  return (
    <p>Chomp frame</p>    
  );
}