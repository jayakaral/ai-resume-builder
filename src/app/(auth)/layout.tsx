import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Layout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { session, user } = await auth();

    if (session && user) {
        redirect('/');
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
            {children}
        </div>
    )
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <Tabs defaultValue="sign-in" className="w-full max-w-md">
                <TabsList className="flex justify-between">
                    <TabsTrigger
                        value="sign-in"
                        className="w-full"
                        asChild
                    >
                        <Link href="/sign-in">
                            Sign In
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger
                        value="sign-up"
                        className="w-full"
                        asChild
                    >
                        <Link href="/sign-up">
                            Sign Up
                        </Link>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="sign-in">{children}</TabsContent>
                <TabsContent value="sign-up">{children}</TabsContent>
            </Tabs>
        </div>
    );
};

export default Layout;
