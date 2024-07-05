import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function Admin() {
  return (
    <>
      <DashboardCard body="body" subtitle="subtitle" title="title" />
      <DashboardCard body="body" subtitle="subtitle" title="title" />
      <DashboardCard body="body" subtitle="subtitle" title="title" />
    </>
  );
}

interface DashboardCardProps {
  title: string;
  subtitle: string;
  body: string;
}

function DashboardCard(props: DashboardCardProps): React.ReactNode {
  const { body, subtitle, title } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
