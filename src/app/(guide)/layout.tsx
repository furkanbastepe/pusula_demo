import { GuideSidebar } from "@/components/layout/GuideSidebar";
import { SidebarMobileSheet } from "@/components/layout/SidebarMobileSheet";

export default function GuideLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* Skip Link for Keyboard Navigation */}
            <a href="#main-content" className="skip-link">
                Ana içeriğe atla
            </a>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <GuideSidebar />
            </div>

            {/* Mobile Header */}
            <SidebarMobileSheet type="guide" />

            {/* Main Content */}
            <main id="main-content" className="lg:pl-64 safe-bottom">
                <div className="min-h-screen">{children}</div>
            </main>
        </div>
    );
}
