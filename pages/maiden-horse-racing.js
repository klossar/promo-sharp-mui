import dynamic from "next/dynamic";

const MaidenHorseRacing = dynamic(() => import("../src/layouts/maiden-horse-racing"), {
  ssr: false,
});

export default function MaidenHorseRacingPage() {
  return <MaidenHorseRacing />;
}