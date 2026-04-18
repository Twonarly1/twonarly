import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";

import type { EIP6963Provider } from "@/lib/hooks/use-injected-wallets";

interface ConnectOptionListProps {
  wallets: EIP6963Provider[];
  onConnect: (wallet: EIP6963Provider) => void;
  disabled?: boolean;
}

const ConnectOptionList = ({ wallets, onConnect, disabled }: ConnectOptionListProps) => {
  return (
    <ItemGroup className="space-y-2">
      {wallets.map((wallet) => (
        <Item key={wallet.info.uuid} asChild size="sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onConnect(wallet)}
            disabled={disabled}
            className="h-auto"
          >
            <ItemMedia>
              <img src={wallet.info.icon} alt={wallet.info.name} className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{wallet.info.name}</ItemTitle>
            </ItemContent>
          </Button>
        </Item>
      ))}
    </ItemGroup>
  );
};

export default ConnectOptionList;
