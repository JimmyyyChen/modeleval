import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { zhCN } from "@clerk/localizations";

export const metadata = {
  title: "ModelEval",
  description: "ModelEval is designed to provide a platform for users to comprehensively evaluate and compare the capabilities of different large models.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={zhCN}>
      <html lang="zh">
        <body className="flex min-h-screen flex-col items-center justify-between">
          <Navbar/>
          <main className="container flex flex-1 flex-col items-center px-6 py-6">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
