import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: 'inicio', label: 'Início' },
    { id: 'estratificacao', label: 'Estratificação' }
  ];

  return (
    <div className="flex gap-2 mb-8">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'outline'}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-3 text-sm font-medium transition-all duration-200",
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};