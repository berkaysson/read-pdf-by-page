# RPBP (Read PDF By Page)

**RPBP** is a modern, React-based web application designed to facilitate the reading, analysis, and text extraction of PDF documents on a page-by-page basis. It provides a seamless interface for users to upload PDFs, view them, extract text using OCR capabilities, and edit the results in real-time.

## 🚀 Features

- **PDF Visualization**: High-fidelity PDF rendering allowing users to navigate through documents page by page.
- **OCR & Text Extraction**: Extracts text from PDF pages (utilizing PDF processing libraries and OCR).
- **Split-View Interface**: A productive layout featuring the PDF/Image view on one side and a robust Text Editor on the other for immediate comparison and correction.
- **Rich Text Editor**: Edit extracted text, fix formatting, and manage content directly within the app.
- **Searchable PDF Export**: (In Progress) Functionality to export the processed text back into a searchable PDF format.
- **Secure Authentication**: Integrated with **Firebase** for secure user login and profile management.
- **Modern UI/UX**: Built with **Tailwind CSS** and **Radix UI** for a responsive, accessible, and clean design. Includes **Dark Mode** support.

## 🛠️ Technology Stack

- **Frontend Framework**: [React](https://reactjs.org/) (v18) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **PDF Core**: [react-pdf](https://github.com/wojtekmaj/react-pdf)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (Icons)
- **Backend / Auth**: [Firebase](https://firebase.google.com/)
- **Routing**: [React Router](https://reactrouter.com/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/berkaysson/read-pdf-by-page.git
    cd read-pdf-by-page
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and configure your Firebase credentials:

    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the Application**
    ```bash
    npm start
    ```
    The app will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📂 Project Structure

- `src/components`: Reusable UI components.
- `src/context`: React Context providers (Auth, PDF state, Theme).
- `src/pages`: Main application pages (Home, Login).
- `src/utilities`: Helper functions for PDF processing and text manipulation.
- `src/App.tsx`: Main application entry point.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
