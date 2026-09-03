import { useState } from "react";
import { Sheet, Button, Input } from "@/components/ui";
import { useAppStore } from "@/context/AppStoreContext";
import { useToast } from "@/context/ToastContext";

export function ReservationFormSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addReservation } = useAppStore();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("19:00");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!name.trim()) {
      setError("Guest name is required.");
      return;
    }
    addReservation({
      id: `res_${Date.now()}`,
      customerId: `cust_${Date.now()}`,
      customerName: name.trim(),
      partySize,
      date,
      time,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    showToast("Reservation created");
    setName("");
    onClose();
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="New reservation"
      footer={
        <Button fullWidth onClick={handleSubmit}>
          Create reservation
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Guest name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          error={error}
          placeholder="e.g. Brian Otieno"
        />
        <Input
          label="Party size"
          type="number"
          min={1}
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input label="Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>
    </Sheet>
  );
}
