import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import ROUTES from "@/constatns/routes";

async function Page() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <h1 className="h1-bold">Welcome to the Ultimate Next.js course!</h1>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
}

export default Page;
