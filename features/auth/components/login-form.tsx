'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormMessage, FormItem, FormLabel, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";


const loginSchema = z.object({
    email : z.string().email("please enter a valid email address"),
    password : z.string().min(1, "Password is required")
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginFrom(){

    const router = useRouter();
    
    const form = useForm<LoginFormValues>({
        resolver : zodResolver(loginSchema),
        defaultValues : {
            email : '',
            password : ''
        }
    })

    const onSubmit = async(values : LoginFormValues) => {
        await authClient.signIn.email({
            email : values.email,
            password : values.password,
            callbackURL: "/"
        },
        {
            onSuccess: ()=>{
                router.push('/')
            },
            onError: (ctx)=>{
                toast.error(ctx.error.message)
            }
        })
    }

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Welcome Back
                    </CardTitle>
                    <CardDescription>
                        Login to Continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant={"outline"} className="w-full" type="button" disabled={isPending} >
                                        Continue With Github
                                    </Button>
                                    <Button variant={"outline"} className="w-full" type="button" disabled={isPending} >
                                        Continue With Google
                                    </Button>
                                    <Button variant={"outline"} className="w-full" type="button" disabled={isPending} >
                                        Continue With X
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField 
                                        control={form.control} 
                                        name = "email" 
                                        render={({field})=>(
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="example@gmail.com" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                    )}/>

                                    <FormField 
                                        control={form.control} 
                                        name = "password" 
                                        render={({field})=>(
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="***********" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                    )}/>
                                    <Button variant={"default"} className="w-full" disabled={isPending}>
                                        Login
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don't have an account? {" "}
                                    <Link href="/signup" className="underline underline-offset-4">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

