import { useState } from 'react';

type AccordionProps = {
    title: string;
    content: React.ReactNode;
};

export function Accordion({ title, content }: AccordionProps) {
    const [open, setOpen] = useState(false);

    return (
        <div>
        <button onClick={() => setOpen((prev) => !prev)}>{title}</button>
        {open ? <div>{content}</div> : null}
        </div>
    );
}