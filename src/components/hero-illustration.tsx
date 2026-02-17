"use client";

import { useState, useEffect } from "react";
import { Bot, Check, Globe, Zap, Lock, Brain, Cpu, Clock, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { PulseIndicator } from "@/components/ui/pulse-indicator";

interface HeroIllustrationProps {
  className?: string;
}

export function HeroIllustration({ className }: HeroIllustrationProps) {
  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      {/* Main Dashboard Card */}
      <div className="relative bg-card border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-background rounded-md text-xs text-muted-foreground flex items-center gap-2">
              <Lock className="h-3 w-3" />
              zerotoaiagents.com
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* AI Agent Status Card */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-xl p-4 border border-green-500/20 animate-fade-in-up stagger-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-green-500" />
                <span className="font-semibold">AI Agent Status</span>
              </div>
              <PulseIndicator variant="success" label="Active" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Active Agents</p>
                <p className="font-mono text-sm">3</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tasks Completed</p>
                <p className="font-mono text-sm flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  127
                </p>
              </div>
            </div>
          </div>

          {/* Response Time Indicator */}
          <div className="bg-muted/30 rounded-xl p-4 border animate-fade-in-up stagger-2">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Response Time</span>
            </div>
            <div className="text-2xl font-bold text-gradient">1.2s avg</div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
            </div>
          </div>

          {/* Feature Pills */}
          <div className="col-span-1 md:col-span-3 flex flex-wrap gap-2 animate-fade-in-up stagger-3">
            <FeaturePill icon={<Layers className="h-3 w-3" />} label="Multi-Model" active />
            <FeaturePill icon={<Cpu className="h-3 w-3" />} label="Auto-Scaling" />
            <FeaturePill icon={<Globe className="h-3 w-3" />} label="API Access" />
            <FeaturePill icon={<Zap className="h-3 w-3" />} label="24/7 Uptime" active />
            <FeaturePill icon={<Brain className="h-3 w-3" />} label="Context Window" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 md:-right-8 animate-float">
        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
          <Brain className="h-4 w-4" />
          GPT-4 + Claude
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 md:-left-8 animate-float" style={{ animationDelay: "1.5s" }}>
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
          <Zap className="h-4 w-4" />
          99.9% Uptime
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-green-500 rounded-full" />
      </div>
    </div>
  );
}

function FeaturePill({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary border border-primary/20"
          : "bg-muted text-muted-foreground border border-transparent"
      )}
    >
      {icon}
      {label}
    </div>
  );
}

// Simpler version for smaller spaces
export function MiniDashboard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-card border rounded-lg p-4 shadow-lg", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">AI Active</span>
        </div>
        <PulseIndicator variant="success" size="sm" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Response Time</span>
          <span className="font-medium">1.2s</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Models</span>
          <span className="font-medium">4</span>
        </div>
      </div>
    </div>
  );
}
