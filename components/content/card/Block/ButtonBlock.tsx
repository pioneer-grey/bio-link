import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type props={
  type:"url"|"img"|"email",
  trigger:React.ReactNode,
  onSubmit?:()=>void,
  title:string,
  inputTitle:string,
  inputPlaceholder:string,
}

const UrlButton = ({type,trigger,onSubmit,title,inputTitle,inputPlaceholder}:props) => {
  return (
   <>
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" >{trigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-card">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
             Add your information below, then click Save to apply changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input name="title" placeholder="Enter Title"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="input">{inputTitle}</Label>
              <Input  name="input" placeholder={inputPlaceholder}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
   
   </>
  )
}

export default UrlButton