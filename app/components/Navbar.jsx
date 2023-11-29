"use client"; // headless ui problem
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  CircleStackIcon,
  BeakerIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const navigation = [
  { name: "数据集", icon: CircleStackIcon, href: "/datasets" },
  { name: "测试", icon: BeakerIcon, href: "/testings" },
  { name: "模型", icon: CubeIcon, href: "/llm-models" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="bg-transparent">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-900">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <img
                      className="h-12 w-auto"
                      src="/logo.png"
                      alt="ModalEval Logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname.startsWith(item.href)
                            ? "font-bold text-teal-800"
                            : "font-medium text-gray-500 hover:text-gray-700",
                          "rounded-md px-3 py-2 text-base",
                        )}
                        aria-current={
                          pathname.startsWith(item.href) ? "page" : undefined
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <SignedIn>
                  <UserButton
                    afterSignOutUrl="/"
                    showName="true"
                    userProfileMode="navigation"
                    userProfileUrl="/profile"
                    appearance={{
                      variables: {
                        colorPrimary: "#497174",
                      },
                      elements: {
                        formFieldInput:
                          "rounded-lg focus:ring-teal-800 focus:border-teal-800 border-gray-200",
                      },
                    }}
                  />
                </SignedIn>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname.startsWith(item.href)
                      ? "font-bold text-teal-800"
                      : "font-medium text-gray-400 hover:text-gray-700",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={
                    pathname.startsWith(item.href) ? "page" : undefined
                  }
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </div>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
