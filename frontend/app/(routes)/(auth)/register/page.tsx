import Image from "next/image"
import { RegisterForm } from "../_components/register-form"

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:flex items-center justify-center p-8">
        <Image src="/images/auth_page.webp" alt="Register image" width={900} height={900}/>
      </div>
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Create an account</h2>
            <p className="text-muted-foreground">Enter your details below</p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
