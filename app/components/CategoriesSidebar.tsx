import { useEffect, useState } from 'react';

type Category = {
    id: number;
    name: string;
};

export function CategoriesSidebar() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch('/api/categories')
        .then((res) => res.json())
        .then((data: Category[]) => setCategories(data));
    }, []);

    return (
        <nav>
        <ul>
            {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
            ))}
        </ul>
        </nav>
    );
}