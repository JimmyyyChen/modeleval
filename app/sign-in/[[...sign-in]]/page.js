import { SignIn } from "@clerk/nextjs"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-teal-500 hover:bg-teal-400 text-sm normal-case",
            footerActionLink: "text-teal-600 hover:text-teal-500 text-sm",
            formFieldInput: "rounded-lg focus:ring-teal-600 focus:border-teal-600 border-gray-200",
          },
        }}
      />
    </main>
  )
}
