import { Metadata } from "next";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "SAJAL GUPTA - Security Researcher & Ethical Hacker",
  description: "Personal website of SAJAL GUPTA, a security researcher, ethical hacker, and bug bounty hunter specializing in web and mobile application security.",
  openGraph: {
    title: "SAJAL GUPTA - Security Researcher & Ethical Hacker",
    description: "Personal website of SAJAL GUPTA, a security researcher, ethical hacker, and bug bounty hunter specializing in web and mobile application security.",
    type: "website"
  }
};

export default function HomePage() {
  return <ClientWrapper />;
}