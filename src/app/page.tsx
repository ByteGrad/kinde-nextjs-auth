import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <main className="flex-1 text-center py-40">
      <h1 className="text-5xl font-bold">Welcome to FreeTechSupport</h1>

      <p className="text-3xl py-4 pb-7">
        Tech problems? Log in and ask our experts for free!
      </p>

      <div className="space-x-3 mt-5">
        <LoginLink className="bg-zinc-900 text-white py-2 px-5 rounded-md mt-10">
          Login
        </LoginLink>
        <RegisterLink className="bg-zinc-500 text-white py-2 px-5 rounded-md mt-10">
          Sign up
        </RegisterLink>
      </div>
    </main>
  );
}
