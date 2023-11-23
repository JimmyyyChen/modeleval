import Link from "next/link";
import {
  IdentificationIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function UserInfo({ isVisitor, username, email, organization, stars }) {
  return (
    <div className="flex w-full flex-col items-center space-y-8 rounded-2xl border border-gray-200 bg-white px-4 py-12 text-left text-primary shadow-lg">
      <div className="h-36 w-36 rounded-full bg-blue-500 transition duration-300 ease-in-out md:h-48 md:w-48"></div>
      <div className="flex w-full flex-col items-start space-y-4 p-2 text-primary">
        <div className="my-4 flex flex-row items-center space-x-4">
          <IdentificationIcon className="h-8 w-8 text-primary" />
          <p className="text-4xl font-bold">{username}</p>
        </div>
        <div className="flex flex-row space-x-4">
          <EnvelopeIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <p>Email</p>
            <p className="text-blue-600">{email}</p>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <BuildingLibraryIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <p>Organization</p>
            <p className="text-blue-600">{organization}</p>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <SparklesIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <p>Stars</p>
            <p className="text-gray-400">{stars}</p>
          </div>
        </div>
      </div>
      {isVisitor ? (
        <></>
      ) : (
        <Link
          className="btn btn-primary w-full text-white"
          href="/profile/settings"
        >
          维护信息
        </Link>
      )}
    </div>
  );
}