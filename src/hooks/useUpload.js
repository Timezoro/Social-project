import { useCallback } from 'react';

export const useUpload = () => {


    const upload = useCallback(async (file) => {

        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('http://4.237.66.47:7700/upload/', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await response.json();
            return { data, status: response.status };

        } catch (err) {
            console.log(err);
        }

    }, []);


    return { upload, };
};