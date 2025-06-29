"use client";

import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

interface FeedbackOptionsProps {
  echoId: string;
  page: string;
  defaultFilter: string;
}

const filterOptions = [
  {
    value: "general",
    label: "General",
  },
  {
    value: "feature",
    label: "Feature Request",
  },
  {
    value: "bug",
    label: "Bug Report",
  },
  {
    value: "error",
    label: "Error Report",
  },
  {
    value: "spam",
    label: "Spam",
  },
];

export function FilterOptions({
  echoId,
  page,
  defaultFilter,
}: FeedbackOptionsProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(defaultFilter);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? filterOptions.find((option) => option.value === value)?.label
            : "Filter"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {filterOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (currentValue === value) {
                      setValue("");
                      router.push(
                        `/dashboard/echo/${echoId}/feedbacks?p=${page}`
                      );
                    } else {
                      setValue(currentValue);
                      router.push(
                        `/dashboard/echo/${echoId}/feedbacks?p=${page}&f=${currentValue}`
                      );
                    }
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
