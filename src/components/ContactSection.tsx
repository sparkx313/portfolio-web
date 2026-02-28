import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitSuccess(null);
      setSubmitError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log(data);
      setSubmitSuccess('Your message has been sent successfully!');
      reset();
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Touch</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-dark-800 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Email</h4>
                  <p className="text-gray-400">muhammed.rabeeh@example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-dark-800 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Location</h4>
                  <p className="text-gray-400">Data Science Hub, Virtual</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-dark-800 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Connect</h4>
                  <div className="flex space-x-4 mt-2">
                    <a href="https://github.com/sparkx313" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.602-3.369-1.344-3.369-1.344-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://linkedin.com/in/muhammed-rabeeh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className={`w-full px-4 py-3 rounded-lg bg-dark-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 rounded-lg bg-dark-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your message here..."
                  className={`w-full px-4 py-3 rounded-lg bg-dark-800 border ${errors.message ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register('message', { required: 'Message is required' })}
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
              >
                Send Message
              </Button>

              {submitSuccess && (
                <div className="mt-4 p-4 rounded-lg bg-green-900/30 border border-green-800 text-green-400">
                  {submitSuccess}
                </div>
              )}

              {submitError && (
                <div className="mt-4 p-4 rounded-lg bg-red-900/30 border border-red-800 text-red-400">
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;