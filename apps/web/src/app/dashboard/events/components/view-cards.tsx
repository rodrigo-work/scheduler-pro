import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@repo/ui/components/card'

type CardsViewPageProps = {
  events: string[]
}

export function CardsViewPage({ events }: CardsViewPageProps) {
  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t md:grid-cols-2 lg:grid-cols-4">
        {events.map((app: any) => {
          // Example: assuming app.endTime is an ISO string
          const endTime = app.endTime ? new Date(app.endTime) : null

          return (
            <Card key={app.id} className="@container/card">
              <CardHeader>
                {/* <CardDescription>New Customers</CardDescription> */}
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                  {app.startTime &&
                    new Date(app.startTime).toLocaleDateString()}
                  {/* Optionally display endTime if needed */}
                  {/* {endTime && ` - ${endTime.toLocaleTimeString()}`} */}
                </CardTitle>
                {/* <CardAction>
                      <Badge variant="outline">
                        <IconTrendingDown />
                        -20%
                      </Badge>
                    </CardAction> */}
              </CardHeader>
              <CardContent className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {app.title}
                </div>
                <div className="text-muted-foreground">{app.description}</div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {app.location}
                </div>
                <div className="text-muted-foreground">
                  {app.startTime &&
                    new Date(app.startTime).toLocaleTimeString()}
                  - |
                  {app.startTime &&
                    new Date(app.startTime).toLocaleTimeString()}
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </>
  )
}
