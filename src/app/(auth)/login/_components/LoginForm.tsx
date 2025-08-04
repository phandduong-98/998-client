"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import GoogleIcon from "@/components/ui/icons/google-icon"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod/v4"

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
})

type SigninInputs = z.infer<typeof signinSchema>

const defaulValues: SigninInputs = {
  email: "",
  password: "",
  rememberMe: true,
}

export function LoginForm() {
  const form = useForm<SigninInputs>({
    defaultValues: defaulValues,
    resolver: zodResolver(signinSchema),
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailLogin: SubmitHandler<SigninInputs> = async data => {
    setIsLoading(true)
    const { email, password, rememberMe } = data

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    })

    if (error) {
      setIsLoading(false)
      toast.error("Signin failed. Check your server log for more details")
    }

    redirect("/")
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const { error: err } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })

    if (err) {
      setIsLoading(false)
      toast.error("Goole login failed. Check your server log for more details")
    }
  }

  return (
    <div className="bg-card rounded-2xl shadow-xl border overflow-hidden md:min-w-md">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 bg-secondary text-primary">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-primary/80 text-sm">
            Sign in to continue to your account
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8 space-y-6">
        {/* Google Login */}
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-3 bg-transparent"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <GoogleIcon />
          <span className="font-medium">Continue with Google</span>
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground font-medium">
              or sign in with email
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEmailLogin)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span className="text-sm text-muted-foreground">
                            Remember me
                          </span>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <a
                href="#"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {"Don't have an account? "}
            <a
              href="/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              Create one now
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
