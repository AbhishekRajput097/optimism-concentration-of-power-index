'use client';
import { useState } from 'react';

interface newDAOModalProps {
    closeModal: () => void;
}

const NewDAOModal: React.FC<newDAOModalProps> = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch('/api/newdao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to submit the form');
            }

            const data = await res.json();
            setSuccess('Form submitted successfully!');
            setName('');
            setEmail('');
            setMessage('');
        } catch (err: any) {
            console.error('Failed to submit the form:', err);
            setError(err.message || 'Failed to submit the form');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
                <div className="popup text-white rounded-xl shadow-lg w-full max-w-xl p-8 relative">
                    {/* Close Button */}
                    <button className="absolute top-4 right-4 text-xl" onClick={closeModal}>
                        &times;
                    </button>

                    {/* Contact Form */}
                    <h2 className="text-2xl mb-4 font-mori font-semibold tracking-tighter">Add Your DAO</h2>
                    <form className="flex flex-col font-mori" onSubmit={handleSubmit}>
                        <div className="flex space-x-2 mb-2">
                            <div className="w-full md:w-1/2">
                                <label htmlFor="name" className="p-2 font-mori font-normal text-[12px] tracking-tighter">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full font-semibold p-2 mt-2 bg-transparent rounded-lg outline-none border-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label htmlFor="email" className="p-2 font-mori font-normal text-[12px] tracking-tighter">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full font-semibold p-2 mt-2 bg-transparent rounded-lg outline-none border-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="p-2 font-mori font-normal text-[12px] tracking-tighter">
                                DAO Information
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full font-normal text-[1rem] p-2 mt-2 bg-transparent rounded-lg outline-none border-none focus:ring-1 focus:ring-orange-500"
                                placeholder="Write your dao information here"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            aria-label="contact-us"
                            className="button-50 max-w-max self-center px-10 py-1 font-redhat font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>

                        {error && <p className="text-red-500 mt-4">{error}</p>}
                        {success && <p className="text-green-500 mt-4">{success}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewDAOModal;
