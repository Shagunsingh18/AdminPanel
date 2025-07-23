

// import { useState, useEffect } from 'react'; 
// import UserForm from './UserForm.jsx';
// import { Pencil, Trash2, Plus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import mockUsers from '@/data/mockUsers.js'; // local mock data

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [form, setForm] = useState(null);
//   const navigate = useNavigate();

//   // Load mock data only once
//   useEffect(() => {
//     setUsers(mockUsers);
//   }, []);

//   const handleAdd = (data) => {
//     const newUser = { ...data, id: String(Date.now()) };
//     setUsers((prev) => [...prev, newUser]);
//     setForm(null);
//   };

//   const handleUpdate = (updated) => {
//     setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
//     setForm(null);
//   };

//   const handleDelete = (id) => {
//     setUsers((prev) => prev.filter((u) => u.id !== id));
//   };

//   const handleView = (user) => {
//     alert(`👤 Name: ${user.name}\n📧 Email: ${user.email}\n🧑‍🎓 Role: ${user.role}`);
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen w-full">
//       <div className="flex flex-col gap-4 px-4 py-6 max-w-full overflow-x-auto">
//         <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <h2 className="text-xl text-gray-800 font-semibold">Users</h2>
//           <div className="flex items-center gap-2 md:w-auto w-full">
//             <input
//               type="text"
//               className="border border-white px-4 py-2 rounded-md w-full md:w-64 bg-gray-400 text-white placeholder-white"
//               placeholder="Search by name or email"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               className="bg-gray-400 border border-white text-white px-4 py-2 rounded-md flex items-center gap-1"
//               onClick={() => setForm({})}
//             >
//               <Plus size={18} /> Add User
//             </button>
//           </div>
//         </header>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border-2 rounded-xl bg-white">
//             <thead>
//               <tr className="text-left bg-gradient-to-r from-pink-300 via-amber-100 to-gray-400">
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Role</th>
//                 <th className="p-3 w-28">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((u) => (
//                 <tr key={u.id} className="border-b hover:bg-gray-100">
//                   <td className="p-3">{u.name}</td>
//                   <td className="p-3">{u.email}</td>
//                   <td className="p-3 capitalize">{u.role}</td>
//                   <td className="p-3 flex gap-2">
//                     <button
//                       onClick={() => handleView(u)}
//                       className="text-blue-600 font-medium hover:underline"
//                       title="View"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => setForm(u)}
//                       className="text-blue-600 hover:underline"
//                       title="Edit"
//                     >
//                       <Pencil size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(u.id)}
//                       className="text-red-600 hover:underline"
//                       title="Delete"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {filteredUsers.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="p-3 text-center text-gray-400">
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {form !== null && (
//         <UserForm
//           initial={form}
//           onCancel={() => setForm(null)}
//           onSubmit={(data) => {
//             form.id ? handleUpdate({ ...data, id: form.id }) : handleAdd(data);
//           }}
//         />
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import UserForm from './UserForm.jsx';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mockUsers from '../../data/mockUsers.js'; // ✅ correct import

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers && savedUsers.length) {
      setUsers(savedUsers);
    } else {
      setUsers(mockUsers); // ✅ use mockUsers if nothing in localStorage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAdd = (data) => {
    const newUser = { ...data, id: String(Date.now()) };
    setUsers([...users, newUser]);
    setForm(null);
  };

  const handleUpdate = (updated) => {
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
    setForm(null);
  };

  const handleDelete = (id) => {
    const filtered = users.filter((u) => u.id !== id);
    setUsers(filtered);
  };

  const handleView = (user) => {
    alert(`👤 Name: ${user.name}\n📧 Email: ${user.email}\n🧑‍🎓 Role: ${user.role}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col gap-4 px-4 py-6 max-w-full overflow-x-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl text-gray-800 font-semibold">Users</h2>
          <div className="flex items-center gap-2 md:w-auto w-full">
            <input
              type="text"
              className="border border-white px-4 py-2 rounded-md w-full md:w-64 bg-gray-400 text-white placeholder-white"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-gray-400 border border-white text-white px-4 py-2 rounded-md flex items-center gap-1"
              onClick={() => setForm({})}
            >
              <Plus size={18} /> Add User
            </button>
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full border-2 rounded-xl bg-white">
            <thead>
              <tr className="text-left bg-gradient-to-r from-pink-300 via-amber-100 to-gray-400">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleView(u)}
                      className="text-blue-600 font-medium hover:underline"
                      title="View"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setForm(u)}
                      className="text-blue-600 hover:underline"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-600 hover:underline"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {form !== null && (
        <UserForm
          initial={form}
          onCancel={() => setForm(null)}
          onSubmit={(data) => {
            form.id ? handleUpdate({ ...data, id: form.id }) : handleAdd(data);
          }}
        />
      )}
    </div>
  );
}
