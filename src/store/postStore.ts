import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    addPost: (title: string, body: string) => Promise<void>;
    deletePost: (id: number) => Promise<void>;
}

const usePostStore = create<PostState>()(
    persist(
        (set, get) => ({
            posts: [],
            loading: false,
            error: null,

            fetchPosts: async () => {
                set({ loading: true, error: null });
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                    if (!response.ok) {
                        throw new Error('Failed to fetch posts');
                    }
                    const data = await response.json();
                    set({ posts: data, loading: false });
                } catch (error) {
                    set({ error: (error as Error).message, loading: false });
                }
            },

            addPost: async (title: string, body: string) => {
                set({ loading: true, error: null });
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title,
                            body,
                            userId: 1,
                        }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to add post');
                    }
                    const newPost = await response.json();
                    set((state) => ({
                        posts: [newPost, ...state.posts],
                        loading: false,
                    }));
                } catch (error) {
                    set({ error: (error as Error).message, loading: false });
                }
            },

            deletePost: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete post');
                    }
                    set((state) => ({
                        posts: state.posts.filter((post) => post.id !== id),
                        loading: false,
                    }));
                } catch (error) {
                    set({ error: (error as Error).message, loading: false });
                }
            },
        }),
        {
            name: 'post-storage',
        }
    )
);

export default usePostStore; 