import React, { useState } from 'react';
import supabase from '../Scripts/supabase.js';
import '../Styles/ImageSelector.css';

const ImageSelector = ({onImageUpload}) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length > 0) {
            const imagePreviews = imageFiles.map(file => ({
                file,
                src: URL.createObjectURL(file)
            }));
            setSelectedImages(imagePreviews);
            setError('');
        } else {
            setError('Please select valid image files.');
        }
    };

    const handleUpload = async () => {
        setUploading(true);
        const uploadedUrls = [];
        try {
            const uploadPromises = selectedImages.map(async ({ file }) => {
                // Upload file lên bucket
                const { error } = await supabase.storage
                    .from('images_nmcnpm') // replace with your bucket name
                    .upload(`public/${file.name}`, file, {
                        cacheControl: '3600',
                        upsert: true, // Cho phép ghi đè nếu trùng tên file
                    });
    
                if (error) {
                    throw error;
                }
    
                // Lấy URL công khai
                const { data: publicUrlData } = supabase.storage
                    .from('images_nmcnpm') // replace with your bucket name
                    .getPublicUrl(`public/${file.name}`);
    
                if (publicUrlData?.publicUrl) {
                    uploadedUrls.push(publicUrlData.publicUrl);
                } else {
                    throw new Error('Failed to retrieve public URL');
                }
            });
    
            await Promise.all(uploadPromises);
    
            // Gửi URL ảnh đã upload về callback
            onImageUpload(uploadedUrls);
    
            alert('Images uploaded successfully!');
        } catch (error) {
            console.error('Error uploading images:', error);
            setError('Error uploading images.');
        } finally {
            setUploading(false);
        }
    };
    

    return (
        <div className="image-selector">
            <div className="input-group">
                <label htmlFor="file-upload">Upload Images:</label>
                <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={uploading}
                />
            </div>

            <div className="preview">
                {selectedImages.length > 0 ? (
                    selectedImages.map((file, index) => (
                        <div key={index} className="image-preview">
                            <img src={file.src} alt={`Uploaded preview ${index + 1}`} />
                        </div>
                    ))
                ) : (
                    <p>No images selected yet.</p>
                )}
                {error && <p className="error">{error}</p>}
            </div>

            {selectedImages.length > 0 && (
                <button onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Images'}
                </button>
            )}
        </div>
    );
};

export default ImageSelector;