import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300">Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="mt-1 w-full rounded-lg bg-gray-700/50 px-4 py-3 text-gray-100 backdrop-blur-lg focus:border-purple-400 focus:ring-purple-400"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 w-full rounded-lg bg-gray-700/50 px-4 py-3 text-gray-100 backdrop-blur-lg focus:border-purple-400 focus:ring-purple-400"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Message</label>
        <textarea
          {...register('message', { required: 'Message is required' })}
          rows={4}
          className="mt-1 w-full rounded-lg bg-gray-700/50 px-4 py-3 text-gray-100 backdrop-blur-lg focus:border-purple-400 focus:ring-purple-400"
        />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-500/20 px-6 py-3 font-semibold text-purple-400 transition-colors hover:bg-purple-500/30"
      >
        Send Message
      </button>
    </motion.form>
  );
}
