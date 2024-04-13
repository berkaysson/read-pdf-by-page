import React from 'react'
import { PageInputForm } from '../components/main/forms/PageInputForm'
import { PDFDisplay } from '../components/main/displays/PDFDisplay'

export const Home: React.FC = () => {
  return (
    <div>
        <PageInputForm />
        <PDFDisplay />
    </div>
  )
}
