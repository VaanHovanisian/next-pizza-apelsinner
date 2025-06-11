import React from "react";
import { Button } from "./ui";
import { User } from "lucide-react";
import { Logo, Container, SearchHeader, BasketButton } from "./";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  hasSearch?: boolean;
}

export const Header: React.FC<Props> = (props) => {
  const { className, hasSearch = true } = props;

  return (
    <div className={cn("pb-8 pt-8", className)}>
      <Container
        className={cn(
          "gap-5 flex items-center justify-between",
          !hasSearch && "border-b border-b-gray-300 pb-8"
        )}
      >
        <Logo />
        {hasSearch && <SearchHeader className="flex-1" />}
        <div className={cn("flex gap-[15px]")}>
          <Button variant="outline">
            <User />
            Войти
          </Button>
          {hasSearch && <BasketButton />}
        </div>
      </Container>
    </div>
  );
};
