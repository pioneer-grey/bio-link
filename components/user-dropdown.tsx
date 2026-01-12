import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User} from 'lucide-react';
import { Button } from './ui/button'
import { SignoutAction } from '@/actions/auth';
const Userdropdown = () => {
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"}><User/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
          </DropdownMenuItem>
          <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={SignoutAction}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
        </DropdownMenuContent>  
    </DropdownMenu>
    </>
  )
}

export default Userdropdown