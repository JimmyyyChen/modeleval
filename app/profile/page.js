import { UserProfile } from "@clerk/nextjs";

export default function Home() {
  return (
    <UserProfile
      appearance={{
        "variables": {
          "colorPrimary": "#497174",
        },
        elements: {
          formFieldInput: "rounded-lg focus:ring-teal-600 focus:border-teal-600 border-gray-200",
        },
      }}
    />
  )
}
