import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['student', 'instructor', 'admin']),
});

export default function UserForm({ initial, onCancel, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial.name || '',
      email: initial.email || '',
      role: initial.role || 'student',
    },
  });

  return (
    <div className="fixed inset-0 text-white dark:bg-gray-500 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-500 p-6 rounded-xl w-96 space-y-4"
      >
        <h3 className="font-semibold text-lg mb-2">
          {initial.id ? 'Edit user' : 'Add user'}
        </h3>

        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            {...register('name')}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            {...register('email')}
            className="w-full p-2 border rounded"
            disabled={!!initial.id}   /* lock email on edit */
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Role</label>
          <select
             {...register('role')}
              className="w-full p-2 border border-white rounded text-black  "
             >

            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
