export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* Full screen wizard layout - no sidebar */}
            {children}
        </div>
    );
}
