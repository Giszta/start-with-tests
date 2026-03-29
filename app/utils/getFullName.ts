export function getFullName (firstName:string, lastName:string): string {
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();

    if (!normalizedFirstName && !normalizedLastName) {
        return "";
    }
    if (!normalizedFirstName) {
        return normalizedLastName;
    }

    if (!normalizedLastName) {
        return normalizedFirstName;
    }

    return `${normalizedFirstName} ${normalizedLastName}`;
}