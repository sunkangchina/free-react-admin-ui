import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { WEditor } from '../components/common/WEditor';
import { Upload } from 'lucide-react';

export function ProductForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    image: null as File | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    navigate('/products');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('products.form.back')}
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('products.form.title')}</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              {t('products.form.fields.title')}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="
                block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500/20
                hover:border-gray-400 focus:border-blue-500
              "
              placeholder={t('products.form.fields.titlePlaceholder')}
            />
          </div>

          {/* Price and Stock Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                {t('products.form.fields.price')}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  className="
                    block w-full pl-8 pr-4 py-2.5
                    bg-white border rounded-lg
                    text-gray-900 text-base
                    transition duration-200 ease-in-out
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20
                    hover:border-gray-400 focus:border-blue-500
                  "
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                {t('products.form.fields.stock')}
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                className="
                  block w-full px-4 py-2.5
                  bg-white border rounded-lg
                  text-gray-900 text-base
                  transition duration-200 ease-in-out
                  placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20
                  hover:border-gray-400 focus:border-blue-500
                "
                placeholder={t('products.form.fields.stockPlaceholder')}
                min="0"
              />
            </div>
          </div>

          {/* Description Editor */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              {t('products.form.fields.description')}
            </label>
            <WEditor
              value={formData.description}
              onChange={(html) => setFormData((prev) => ({ ...prev, description: html }))}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              {t('products.form.fields.image')}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>{t('products.form.fields.uploadImage')}</span>
                    <input
                      id="image-upload"
                      name="image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">{t('products.form.fields.orDragAndDrop')}</p>
                </div>
                <p className="text-xs text-gray-500">{t('products.form.fields.imageSize')}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="
                px-6 py-2.5 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-white font-medium
                transition duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-blue-500/20
              "
            >
              {t('products.form.createProduct')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}