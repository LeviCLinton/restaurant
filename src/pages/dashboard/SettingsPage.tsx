import { useSeo } from "@/hooks/useSeo";
import { Card, CardBody, Input, Button } from "@/components/ui";
import { restaurant } from "@/data";

export function SettingsPage() {
  useSeo({ title: "Settings", description: "Manage Ember's restaurant profile.", path: "/dashboard/settings" });

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-5 font-display text-2xl font-semibold text-ink-950">Settings</h1>
      <Card>
        <CardBody className="flex flex-col gap-4">
          <h2 className="font-display font-semibold text-ink-950">Restaurant profile</h2>
          <Input label="Restaurant name" defaultValue={restaurant.name} />
          <Input label="Address" defaultValue={restaurant.address} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Tax (%)" type="number" defaultValue={restaurant.taxPercent} />
            <Input label="Service fee (%)" type="number" defaultValue={restaurant.serviceFeePercent} />
          </div>
          <Button className="self-start">Save changes</Button>
        </CardBody>
      </Card>
    </div>
  );
}
