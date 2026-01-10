import { Button } from '@/components/ui/button'
import { SignoutAction } from '@/actions/auth'
export default async function Page() {

    return (
        <div>
            <Button onClick={SignoutAction}>Logout</Button>
        </div>
    )
}