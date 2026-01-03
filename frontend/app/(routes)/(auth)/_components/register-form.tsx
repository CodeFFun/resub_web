"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ZodError } from "zod"
import { RegisterInput, registerSchema } from "./lib/validation"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<RegisterInput>>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const validatedData = registerSchema.parse({
        name,
        email,
        password,
      })
      // TODO: Implement registration logic
      console.log("Registration attempt:", validatedData)
      router.push("/auth/dashboard")
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<RegisterInput> = {}
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof RegisterInput
          fieldErrors[field] = err.message 
        })
        setErrors(fieldErrors)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full bg-transparent py-3 px-0 placeholder-muted-foreground focus:outline-none transition-colors ${
            errors.name ? "border-b-2 border-red-500" : "border-b border-muted-foreground"
          }`}
          required
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email or Phone Number
        </label>
        <input
          id="email"
          type="text"
          placeholder="Email or Phone Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full bg-transparent py-3 px-0 placeholder-muted-foreground focus:outline-none transition-colors ${
            errors.email ? "border-b-2 border-red-500" : "border-b border-muted-foreground"
          }`}
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full bg-transparent py-3 px-0 placeholder-muted-foreground focus:outline-none transition-colors ${
            errors.password ? "border-b-2 border-red-500" : "border-b border-muted-foreground"
          }`}
          required
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="space-y-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#3d3d1f] text-white py-3 rounded hover:bg-[#2d2d15] transition-colors"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full py-3 rounded border border-foreground hover:bg-muted bg-transparent"
        ></Button>
      </div>

      <p className="text-center text-sm">
        Already have account?{" "}
        <Link href="/login" className="text-foreground font-medium hover:underline">
          Log in
        </Link>
      </p>
    </form>
  )
}
