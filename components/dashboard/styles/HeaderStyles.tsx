import React from 'react'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { styles } from '@/store/types'
import { useStyles } from '@/store/useStyles'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

export const formSchema = z.object({
    profilePictureShadow: z.number(),
    profilePictureBorder: z.number(),
    socialIconSize: z.number(),
});

const HeaderStyles = () => {

    const { setProfilePictureBorder, setProfilePictureShadow,
        styles } = useStyles()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            profilePictureShadow: styles?.profilePictureShadow ?? 2,
            profilePictureBorder: styles?.profilePictureBorder ?? 2,
            socialIconSize: styles?.socialIconSize ?? 2,
        },
    })

    async function onSubmit(values: styles) {
        // try {
        //   const res = await mutateAsync(values)
        //   console.log(res)
        // } catch (err: any) {
        //   console.log(err)
        // }
    }

    return (
        <>
            <Form {...form}>
                <form className='border-b mb-2'  >
                    <h1 className='text-sm pt-2 pl-4 font-bold '>Header Styles</h1>
                    <FormField
                        control={form.control}
                        name="profilePictureShadow"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Profile Picture Shadow</p>
                                        <Slider
                                            min={0}
                                            max={10}
                                            step={1}
                                            className="w-[40%]"
                                            value={[field.value]}
                                            onValueChange={(val) => {
                                                field.onChange(val[0])
                                                setProfilePictureShadow(val[0])
                                            }}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="profilePictureShadow"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm  font-light'>Profile Picture Border</p>
                                        <Slider
                                            min={0}
                                            max={10}
                                            step={1}
                                            className={cn("w-[40%]")}
                                            value={[field.value]}
                                            onValueChange={(val: number[]) =>{ 
                                                field.onChange(val[0])
                                                setProfilePictureBorder(val[0])}}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="socialIconSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm  font-light'>Social Icon Size</p>
                                        <Slider
                                            defaultValue={[50]}
                                            min={1}
                                            max={10}
                                            step={1}
                                            className={cn("w-[40%]")}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </>
    )
}

export default HeaderStyles