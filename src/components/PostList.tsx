import { useEffect, useState } from 'react';
import usePostStore from '../store/postStore';

export default function PostList() {
    const { posts, loading, error, fetchPosts, addPost, deletePost } = usePostStore();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && body.trim()) {
            await addPost(title, body);
            setTitle('');
            setBody('');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-4">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => fetchPosts()}
                    className="mt-2 btn btn-primary"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        className="input"
                    />
                </div>
                <div>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Post content"
                        className="input min-h-[100px]"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!title.trim() || !body.trim()}
                >
                    Add Post
                </button>
            </form>

            <div className="space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="card group"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-secondary-900">
                                {post.title}
                            </h3>
                            <button
                                onClick={() => deletePost(post.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-secondary-400 hover:text-red-500 p-1"
                                title="Delete post"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-2 text-secondary-700">
                            {post.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
} 