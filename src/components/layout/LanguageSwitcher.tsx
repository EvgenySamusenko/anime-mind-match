
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { language } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-foreground hover:text-anime-purple cursor-default"
    >
      РУС
    </Button>
  );
}
