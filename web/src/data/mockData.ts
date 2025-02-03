export const events = [
    {
      id: 1,
      name: "Tech Conference 2023",
      date: "2023-10-15",
      attendees: 120,
      revenue: 5000,
    },
    {
      id: 2,
      name: "Music Festival 2023",
      date: "2023-11-20",
      attendees: 500,
      revenue: 20000,
    },
  ];
  
  export const registrations = [
    { id: 1, eventId: 1, name: "John Doe", email: "john@example.com", date: "2023-10-01" },
    { id: 2, eventId: 1, name: "Jane Smith", email: "jane@example.com", date: "2023-10-05" },
    { id: 3, eventId: 2, name: "Alice Johnson", email: "alice@example.com", date: "2023-11-01" },
  ];
  
  export const transactions = [
    { id: 1, eventId: 1, amount: 100, date: "2023-10-01" },
    { id: 2, eventId: 1, amount: 150, date: "2023-10-05" },
    { id: 3, eventId: 2, amount: 200, date: "2023-11-01" },
  ].map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
  }));