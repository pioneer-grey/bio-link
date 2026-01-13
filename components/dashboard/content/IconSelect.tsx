import React,{ useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import {MultiSelect} from "@/components/multi-select"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus} from "lucide-react";
import { IconBrandFacebook,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTiktok
} from '@tabler/icons-react';
const FormSchema = z.object({
  frameworks: z
    .array(z.string())
});

const IconsList = [
  { value: "fb", label: "Facebook",icon:IconBrandFacebook},
  { value: "yt", label: "Youtube",icon:IconBrandYoutube},
  { value: "tiktok", label: "Tiktok",icon:IconBrandInstagram},
  { value: "insta", label: "Instagram" ,icon:IconBrandTiktok},
];

const IconSelect = () => {
     const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      frameworks: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast.success(`Selected: ${data.frameworks.join(", ")}`);
  }

  return (
    <>
        <Form {...form}>
      <h1 className="p-2">Add Icons</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-1 items-center">
        <FormField 
          control={form.control}
          name="frameworks"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <MultiSelect 
                
                className="border-2 border-secondary bg-card"
                  options={IconsList}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Icons"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"><Plus/></Button>
      </form>
    </Form>
    </>
  )
}

export default IconSelect