import React from 'react'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CardType } from '@/store/types'
import { useStyles } from '@/store/useStyles'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { UpdateCardStyles } from '@/actions/styles'

export const formSchema = z.object({
    cardColor: z.string(),
    cardTextColor: z.string(),
    cardCorner: z.number(),
    cardBorder: z.number(),
    cardBorderColor: z.string(),
    cardShadow: z.number(),
    cardSpacing: z.number(),
});

const CardStyles = () => {
    const { mutateAsync } = UpdateCardStyles()
    const { styles, setCardColor, setCardTextColor, setCardCorner, setCardBorder,
        setCardBorderColor, setCardShadow, setCardSpacing } = useStyles()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardColor: styles?.cardColor || "",
            cardTextColor: styles?.cardTextColor || "",
            cardCorner: styles?.cardCorner ?? 2,
            cardBorder: styles?.cardBorder ?? 0,
            cardBorderColor: styles?.cardBorderColor || "",
            cardShadow: styles?.cardShadow ?? 2,
            cardSpacing: styles?.cardSpacing ?? 2
        },
    })
    async function onSubmit(values: CardType) {
        try {
            const res = await mutateAsync(values)

        } catch (err: any) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        let timeout: NodeJS.Timeout

        const subscription = form.watch((values) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {

                const safeValues = {
                    userName: styles?.userName || "",
                    cardColor: values.cardColor || "",
                    cardTextColor: values.cardTextColor || "",
                    cardCorner: values.cardCorner ?? 2,
                    cardBorder: values.cardBorder ?? 0,
                    cardBorderColor: values.cardBorderColor || "",
                    cardShadow: values.cardShadow ?? 2,
                    cardSpacing: values.cardSpacing ?? 2
                }
                onSubmit(safeValues)
            }, 5000)
        })
        return () => {
            clearTimeout(timeout)
            subscription.unsubscribe()
        }
    }, [form])

    return (
        <>
            <Form {...form}>
                <form className='m-2' >
                    <h1 className='text-sm font-bold pt-2 pl-4'>Card Styles</h1>
                    <FormField
                        control={form.control}
                        name="cardColor"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl '>
                                        <p className='text-sm font-light'>Card Color</p>
                                        <Input className='w-15' type='color' {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                setCardColor(e.target.value)
                                            }}
                                        ></Input>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardTextColor"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Text Color</p>
                                        <Input className='w-15' type='color' {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                setCardTextColor(e.target.value)
                                            }}
                                        ></Input>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardCorner"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>

                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Corner</p>
                                        <Slider
                                            min={0}
                                            max={20}
                                            step={2}
                                            className={cn("w-[40%]")}
                                            value={[field.value]}
                                            onValueChange={(val: number[]) => {
                                                field.onChange(val[0])
                                                setCardCorner(val[0])
                                            }}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardBorder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Border</p>
                                        <Slider
                                            min={0}
                                            max={10}
                                            step={1}
                                            className={cn("w-[40%]")}
                                            value={[field.value]}
                                            onValueChange={(val: number[]) => {
                                                field.onChange(val[0])
                                                setCardBorder(val[0])
                                            }}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardBorderColor"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Border Color</p>
                                        <Input className='w-15' type='color' {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                setCardBorderColor(e.target.value)
                                            }}
                                        ></Input>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardShadow"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Shadow</p>
                                        <Slider
                                            min={0}
                                            max={10}
                                            step={1}
                                            className={cn("w-[40%]")}
                                            value={[field.value]}
                                            onValueChange={(val: number[]) => {
                                                field.onChange(val[0])
                                                setCardShadow(val[0])
                                            }}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardSpacing"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Spacing</p>
                                        <Slider
                                            min={0}
                                            max={20}
                                            step={2}
                                            className={cn("w-[40%]")}
                                            value={[field.value]}
                                            onValueChange={(val: number[]) => {
                                                field.onChange(val[0])
                                                setCardSpacing(val[0])
                                            }}
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

export default CardStyles