import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoadingSkeleton() {
  return (
    <Card className="shadow-lg gap-3 h-full justify-between">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-32 mb-2" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="w-24 h-24" />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-0">
          <div>
            <Skeleton className="h-16 w-40" />
            <Skeleton className="h-6 w-32 mt-1" />
          </div>

          <div className="flex flex-col gap-2 lg:items-end">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-muted/50 h-24">
              <CardContent className="flex items-center gap-3 p-4 h-full">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
