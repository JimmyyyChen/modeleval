import { UserProfile } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <UserProfile
        appearance={{
          elements: {
            profileSectionPrimaryButton:
              "hover:bg-green-50 text-teal-800",
            badge: "bg-teal-600 text-white",
            avatarImageActionsUpload: "text-teal-800",
            fileDropAreaButtonPrimary: "text-teal-800 hover:bg-green-50",
            formButtonReset: "text-teal-800 hover:bg-green-50",
            formButtonPrimary: "bg-teal-800 hover:bg-teal-700",
          },
        }}
      />
    </main>
  )
}
