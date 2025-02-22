import Image from "next/image";
import { redirect } from 'next/navigation'
import { use } from 'react'
import { Button } from "@/components/ui/Button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/AlertDialog"

export default function Home({
  searchParams
}: {
  searchParams: { 
    code?: string    // PKCE auth code
    invite?: string  // Supabase auth invites
    token?: string   // Our org invites
    org?: string
  }
}) {
  const params = use(Promise.resolve(searchParams))
  
  // If we have a code (from PKCE flow), redirect to login with all params
  if (params.code) {
    const searchParamsString = new URLSearchParams({
      code: params.code,
      ...(params.invite && { invite: params.invite }), // Keep Supabase invite param
      ...(params.org && { org: params.org }),
    }).toString();
    
    redirect(`/auth/login?${searchParamsString}`);
  }

  // Our custom org invite token handling - updated to use new /invite route
  if (params.token) {
    redirect(`/invite?token=${params.token}`);  // Removed org param as it's included in the invite data
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>

        {/* Button Showcase Section */}
        <section className="w-full max-w-4xl mt-12 space-y-8">
          <h2 className="text-xl font-semibold mb-6">Button Components</h2>
          
          <div className="grid gap-8">
            {/* Regular Buttons */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Regular Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* States */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button disabled>Disabled</Button>
                <Button isLoading>Loading</Button>
              </div>
            </div>

            {/* Glass Buttons (with gradient background) */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Glass Effect</h3>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg">
                <div className="flex flex-wrap gap-4">
                  <Button variant="glass">Glass</Button>
                  <Button variant="glass" size="sm">Small Glass</Button>
                  <Button variant="glass" size="lg">Large Glass</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AlertDialog Showcase Section */}
        <section className="w-full max-w-4xl mt-12 space-y-8">
          <h2 className="text-xl font-semibold mb-6">Alert Dialog Components</h2>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Alert Dialog Variants</h3>
            <div className="flex flex-wrap gap-4">
              {/* Primary Alert */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Show Alert</Button>
                </AlertDialogTrigger>
                <AlertDialogContent variant="primary">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to continue? This action can be undone later.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button>Continue</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Destructive Alert */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Destructive Alert</Button>
                </AlertDialogTrigger>
                <AlertDialogContent variant="destructive">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your account and remove your data.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Warning Alert */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Warning Alert</Button>
                </AlertDialogTrigger>
                <AlertDialogContent variant="warning">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                    <AlertDialogDescription>
                      You have unsaved changes. Are you sure you want to leave?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="outline">Stay</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button variant="destructive">Leave</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
