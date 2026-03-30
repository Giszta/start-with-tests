export type Message = {
  id: number;
  text: string;
  createdAt: string;
};

export type GroupedMessages = Record<string, Message[]>;

export function groupMessagesByDay(messages: Message[]): GroupedMessages {
  return messages.reduce<GroupedMessages>((groups, message) => {
    const date = new Date(message.createdAt);

    if (Number.isNaN(date.getTime())) {
      throw new Error('Niepoprawna data wiadomości');
    }

    const dayKey = date.toISOString().slice(0, 10);

    if (!groups[dayKey]) {
      groups[dayKey] = [];
    }

    groups[dayKey].push(message);

    return groups;
  }, {});
}