import React from "react";
import { Button } from "./ui";
import { User } from "lucide-react";
import { Logo, Container, SearchHeader, BasketButton } from "./";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className={cn("mb-8 mt-8", className)}>
      <Container className="gap-5 flex items-center justify-between">
        <Logo />
        <SearchHeader className="flex-1" />
        <div className={cn("flex gap-[15px]")}>
          <Button variant="outline">
            <User />
            Войти
          </Button>
          <BasketButton />
        </div>
      </Container>
    </div>
  );
};
