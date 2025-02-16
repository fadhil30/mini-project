// "use client";
// import { useEffect, useState } from "react";
// import { fetcher } from "@/utils/api";

// interface PromotorTrans {
//   id: string;
//   amount: number;
//   createdAt: string;
// }

// export default function PromotorTrans() {
//   const [promotorTrans, setPromotorTrans] = useState<PromotorTrans[]>([]);

//   useEffect(() => {
//     fetcher("/promotorTrans")
//       .then((data) => setPromotorTrans(data))
//       .catch((err) => console.error("Error fetching promotorTrans:", err));
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Transaction List</h2>
//       <ul>
//         {promotorTrans.map((promotorTrans) => (
//           <li key={promotorTrans.id} className="border-b py-2">
//             Amount: ${promotorTrans.amount} - {new Date(promotorTrans.createdAt).toLocaleDateString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
