/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  IdentificationIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function UserInfo({ isvisitor, userInfo }) {
  if (userInfo) {
    var { image_url, username, email, organization, stars } = userInfo;
  }

  // TODO: 头像
  return (
    <div className="flex h-full w-full flex-col items-center space-y-8 rounded-2xl border border-gray-200 bg-white px-4 py-12 text-left text-primary shadow-lg">
      {image_url ? (
        <div className="avatar">
          <div className="flex w-36 items-center justify-center rounded-full md:w-48">
            <img src={image_url} alt={username} />
          </div>
        </div>
      ) : (
        <div className="avatar placeholder">
          <div className="w-36 rounded-full bg-primary text-neutral-content md:w-48">
            <span className="text-6xl md:text-8xl">
              {username && username[0]}
            </span>
          </div>
        </div>
      )}
      <div className="flex h-full w-full flex-col items-start space-y-4 p-2 text-primary">
        <div className="my-4 flex h-full w-full flex-row items-center space-x-4 truncate">
          <IdentificationIcon className="h-8 w-8 text-primary" />
          <p className="h-full truncate text-4xl font-bold">{username}</p>
        </div>
        <div className="flex w-full flex-row space-x-4">
          <EnvelopeIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col truncate">
            <p>Email</p>
            <a className="truncate text-blue-600" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        </div>
        <div className="flex w-full flex-row space-x-4">
          <BuildingLibraryIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col truncate">
            <p>Organization</p>
            <p className="truncate text-gray-400">{organization}</p>
          </div>
        </div>
        <div className="flex w-full flex-row space-x-4">
          <SparklesIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col truncate">
            <p>Stars</p>
            <p className="truncate text-gray-400">{stars}</p>
          </div>
        </div>
      </div>
      {isvisitor ? (
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
