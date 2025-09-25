import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("../src/layouts/dashboard"), {
  ssr: false,
});

export default function HomePage() {
  return <Dashboard />;
}