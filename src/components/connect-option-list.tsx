import { Button } from "@/components/ui/button";

import type { EIP6963Provider } from "@/lib/hooks/use-injected-wallets";

interface ConnectOptionListProps {
  wallets: EIP6963Provider[];
  onConnect: (wallet: EIP6963Provider) => void;
  disabled?: boolean;
}

const ConnectOptionList = ({ wallets, onConnect, disabled }: ConnectOptionListProps) => {
  return (
    <div className="grid space-y-2">
      {wallets.map((wallet) => (
        <Button
          key={wallet.info.uuid}
          variant="outline"
          size="sm"
          onClick={() => onConnect(wallet)}
          disabled={disabled}
          className="h-10 items-center justify-start gap-3"
        >
          <img src={wallet.info.icon} alt={wallet.info.name} className="size-5" />
          {wallet.info.name}
        </Button>
      ))}
    </div>
  );
};

export default ConnectOptionList;
