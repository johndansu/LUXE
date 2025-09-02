"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building2 } from "lucide-react";
import { useSeriousMode } from "@/lib/serious-mode";

export function SeriousModeToggle() {
  const { isSeriousMode, toggleSeriousMode } = useSeriousMode();

  return (
    <div className="flex items-center space-x-3">
      <Switch
        id="serious-mode"
        checked={isSeriousMode}
        onCheckedChange={toggleSeriousMode}
        className="data-[state=checked]:bg-slate-700"
      />
      <Label htmlFor="serious-mode" className="flex items-center space-x-2 cursor-pointer">
        <Building2 className="h-4 w-4 text-slate-600" />
        <span className="text-sm font-medium text-slate-700">Business Mode</span>
        {isSeriousMode && (
          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-slate-200">
            ACTIVE
          </Badge>
        )}
      </Label>
    </div>
  );
}

export function SeriousModeIndicator() {
  const { isSeriousMode } = useSeriousMode();

  if (!isSeriousMode) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge className="bg-slate-800 text-white px-3 py-1 text-sm font-medium shadow-lg">
        <Briefcase className="h-3 w-3 mr-1" />
        BUSINESS MODE
      </Badge>
    </div>
  );
}
