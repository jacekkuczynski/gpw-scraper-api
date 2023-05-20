import DialogCreateWallet from "@/components/DialogCreateWallet/DialogCreateWallet";
import SelectWallet from "@/components/SelectWallet/SelectWallet";

export default function Home() {
  return (
    <div style={{ width: "100%" }}>
      Hello world
      <DialogCreateWallet />
      <SelectWallet />
    </div>
  );
}
