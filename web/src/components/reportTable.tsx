// import { transactions } from "../data/mockData";

// export default function ReportsTable() {
//   return (
//     <div className="p-4 bg-white shadow rounded-lg overflow-x-auto">
//       <h2 className="text-lg sm:text-xl font-bold mb-4">Transaction Reports</h2>
//       <table className="w-full text-left">
//         <thead>
//           <tr>
//             <th className="p-2">ID</th>
//             <th className="p-2">Event ID</th>
//             <th className="p-2">Amount</th>
//             <th className="p-2">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction) => (
//             <tr key={transaction.id} className="border-b">
//               <td className="p-2">{transaction.id}</td>
//               <td className="p-2">{transaction.eventId}</td>
//               <td className="p-2">{transaction.amount}</td>
//               <td className="p-2">{transaction.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }