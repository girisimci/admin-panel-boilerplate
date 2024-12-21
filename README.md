# Admin Panel Boilerplate

Welcome to the **Admin Panel Boilerplate**! This project is designed as a comprehensive and flexible starting point for building modern admin panels with **Next.js**, **React**, and a suite of essential tools.

---

## **Features**

### **Core Technologies**
- **Next.js 15**: The latest version of the React framework for server-side rendering and static site generation.
- **React 19**: Cutting-edge features of the React library.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **React Hook Form**: Lightweight form validation.
- **Yup**: Schema-based form validation.
- **Tiptap Editor**: Rich text editor with support for images, links, and tables.
- **Chart.js & React Chart.js 2**: Data visualization with modern charts.
- **Redux Toolkit Query**: Efficient state and API management.
- **i18next**: Powerful internationalization and localization support.

### **Built-in Features**
- **Dynamic Forms** with validation.
- **Rich Text Editing** powered by Tiptap.
- **Responsive Design** with TailwindCSS.
- **Interactive Charts** for data visualization.
- **Scalable Architecture** using modern design patterns.
- **Language Support** via `i18next` for multilingual applications.

---

## **Getting Started**

### **Installation**

Clone this repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/your-username/admin-panel-boilerplate.git

# Navigate into the project directory
cd admin-panel-boilerplate

# Install dependencies
npm install
```

### **Development**

Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the project.

### **Build for Production**

Generate a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## **Project Structure**

```plaintext
src/
├── components/       # UI components (e.g., buttons, inputs, tables)
├── hooks/            # Custom React hooks
├── layouts/          # Page layouts (e.g., AdminLayout)
├── pages/            # Next.js pages
├── public/           # Static files (e.g., images, icons)
├── services/         # Redux Toolkit Query slices and API definitions
├── styles/           # TailwindCSS and other styles
├── utils/            # Utility functions
├── translations/     # i18next translation files
```

---

## **Key Dependencies**

### **Core Libraries**
- **Next.js**: Framework for server-side rendering and static site generation.
- **React**: The popular UI library.
- **TailwindCSS**: Utility-first CSS framework.

### **State and API Management**
- **Redux Toolkit Query**: Efficient state management and API querying.

### **Localization**
- **i18next**: Comprehensive internationalization support.

### **Forms and Validation**
- **React Hook Form**: Performant and flexible form management.
- **Yup**: Schema-based validation for forms.

### **Rich Text Editor**
- **Tiptap**: Modern and extensible rich text editor.

### **Charts**
- **Chart.js**: Feature-rich charting library.
- **React Chart.js 2**: React wrapper for Chart.js.

---

## **Usage**

### **Dynamic Forms**
Leverage `react-hook-form` and `yup` for form validation:

```jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const MyForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};
```

### **Rich Text Editing**
Utilize Tiptap for rich text editing:

```jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const MyEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start typing...</p>',
  });

  return <EditorContent editor={editor} />;
};
```

### **Redux Toolkit Query**
Set up API slices and use them efficiently:

```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;
```

### **Localization**
Set up i18next for language support:

```jsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translations/en.json';
import translationTR from './translations/tr.json';

const resources = {
  en: { translation: translationEN },
  tr: { translation: translationTR },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
```

---

## **Contributing**

We welcome contributions! Please follow these steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

---

## **License**

This project is licensed under the MIT License.

