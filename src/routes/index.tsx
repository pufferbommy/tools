import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="text-center py-16 px-4">
      <h1 className="mb-2 text-4xl font-bold">รวมมิตรเครื่องมือ</h1>
      <p className="mb-4-">
        เว็บรวบรวมเครื่องมือออนไลน์ทุกอย่างบนโลกนี้ ใช้งานง่าย รวดเร็ว และฟรี
      </p>
    </div>
  )
}
