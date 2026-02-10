import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NextStepCard({ title, description, actionLabel, onAction }: any) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                <Button onClick={onAction}>{actionLabel || "Devam Et"}</Button>
            </CardContent>
        </Card>
    );
}
