import { match } from "ts-pattern";

import { WalletConnectIcon } from "@/components/icons/wallet-connect";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";

import type { Connector } from "wagmi";

interface ConnectOptionListProps {
  connectors: Connector[];
  onConnect: (connector: Connector) => void;
  disabled?: boolean;
}

const ConnectOptionList = ({ connectors, onConnect, disabled }: ConnectOptionListProps) => {
  return (
    <ItemGroup className="space-y-2">
      {connectors.map((connector) => (
        <Item key={connector.uid} asChild size="sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onConnect(connector)}
            disabled={disabled}
            className="h-auto"
          >
            <ItemMedia>
              {match(connector.id)
                .with("walletConnect", () => <WalletConnectIcon className="size-5" />)
                .otherwise(() => (
                  <img src={connector.icon} alt={connector.name} className="size-5" />
                ))}
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{connector.name}</ItemTitle>
            </ItemContent>
          </Button>
        </Item>
      ))}
    </ItemGroup>
  );
};

export default ConnectOptionList;
