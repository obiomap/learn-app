import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/SessionProvider";
import SidebarNav from "@/components/SidebarNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const isPro = (session.user as any)?.subscriptionStatus === "pro";
  const userName = session.user?.name ?? session.user?.email ?? "Learner";
  const userInitial = userName[0]?.toUpperCase() ?? "?";

  return (
    <SessionProvider session={session}>
      <div className="h-screen flex bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shrink-0 shadow-sm">
          <SidebarNav userName={userName} userInitial={userInitial} isPro={isPro} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto h-full">{children}</main>
      </div>
    </SessionProvider>
  );
}
