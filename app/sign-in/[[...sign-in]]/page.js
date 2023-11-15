import { SignIn } from "@clerk/nextjs"
import Link from "next/link"

export default function Home() {
  return (
    <SignIn
      appearance={{
        "variables": {
          "colorPrimary": "#497174"
         },
        elements: {
          formFieldInput: "rounded-lg focus:ring-teal-600 focus:border-teal-600 border-gray-200",
        },
      }}
    />
  )
}
