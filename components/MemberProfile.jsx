
import { currentUser, auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { getOrGenerateTokens } from "../utils/actions";

async function MemberProfile() {
    const user= await currentUser();
    const userEmail=user.emailAddresses[0].emailAddress;
    const {userId}=auth();
    await getOrGenerateTokens(userId);
  

  return (
    <div className="pl-4">
      <div className="flex align-center">
        <UserButton afterSignOutUrl="/"/>
        <h3 className="ml-4">
          {user.firstName} {user.lastName}
        </h3>
      </div>
      <h6 className="text-xs">{userEmail}</h6>
    </div>
  );
}

export default MemberProfile
