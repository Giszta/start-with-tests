import { useState } from 'react';

type Tab = {
    id: string;
    label: string;
    content: React.ReactNode;
};

type TabsProps = {
    tabs: Tab[];
};

export function Tabs({ tabs }: TabsProps) {
    const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    return (
        <div>
        <div role="tablist">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                role="tab"
                aria-selected={activeTabId === tab.id}
                onClick={() => setActiveTabId(tab.id)}
            >
                {tab.label}
            </button>
            ))}
        </div>

        <div role="tabpanel">{activeTab?.content}</div>
        </div>
    );
}