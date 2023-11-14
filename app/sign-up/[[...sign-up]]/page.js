import { SignUp } from "@clerk/nextjs"

export default function Home() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-teal-500 hover:bg-teal-400 text-sm normal-case",
          footerActionLink: "text-teal-600 hover:text-teal-500 text-sm",
          formFieldInput: "rounded-lg focus:ring-teal-600 focus:border-teal-600 border-gray-200",
        },
      }}
    />
  )
}
