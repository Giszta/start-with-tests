export function truncateText (text:string, maxLength:number): string {
    if (maxLength <=0) {
        throw new Error ("maxLength musi być większe od 0");
    
    }

    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}