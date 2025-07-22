import { useForm } from 'react-hook-form';

export default function CourseForm({ initial, onCancel, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initial.title || '',
      category: initial.category || '',
      description: initial.description || '',
    },
  });

  return (
    <div className="fixed inset-0 dark:bg-gray-600 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-white dark:bg-gray-600 p-6 rounded-xl w-96 space-y-4"
      >
        <h3 className="font-semibold text-lg mb-2">
          {initial.id ? 'Edit Course' : 'Add Course'}
        </h3>

        <div>
          <label className="block text-sm mb-1">Title</label>
          <input {...register('title', { required: true })} className="w-full p-2 border rounded" />
          {errors.title && <p className="text-red-500 text-xs">Title is required</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <input {...register('category', { required: true })} className="w-full p-2 border rounded" />
          {errors.category && <p className="text-red-500 text-xs">Category is required</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea {...register('description')} className="w-full p-2 border rounded" />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
